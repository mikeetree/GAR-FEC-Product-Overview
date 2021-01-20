const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');
const api = require('../api');

jest.mock('../../database');
const database = require('../../database');

const app = express();
app.use('/api', api);

// TODO-LOW:
//   figure out why --forceExit is needed to exit jest after running these tests

describe('Product API', () => {
  const mockProduct = {product_id: 42};
  // const mockDB = jest.mock('../../database');
  // console.log(mockDB.mock);

  describe('GET /api/products/all', () => {
    it('returns an array of products with a status code of 200', async (done) => {
      const products = [mockProduct];
      database.getAllProducts.mockResolvedValue(products);

      request(app).get('/api/products/all')
        .expect(200)
        .then((res) => {
          expect(res.body).toBeInstanceOf(Array);
          expect(res.body).toContainEqual(mockProduct);
          done();
        });
    });
  });

  describe('GET /api/products/random', () => {
    it('GET /api/products/random returns a product with a status code of 200', async (done) => {
      database.getRandomProduct.mockResolvedValue(mockProduct);

      request(app).get('/api/products/random')
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchObject(mockProduct);
          done();
        });
    });
  });

  describe('GET /products/id/:productID', () => {
    it('should return a product with matching productID with status code of 200', async (done) => {
      database.getProductById.mockImplementation(async (id) => {
        return id == mockProduct.product_id ? mockProduct : null;
      });

      request(app).get('/api/products/id/' + mockProduct.product_id)
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchObject(mockProduct);
          done();
        });
    });

    it('should return a 404 status code if matching product is not found', async (done) => {
      database.getProductById.mockImplementation(async (id) => {
        return id == mockProduct.product_id ? mockProduct : null;
      });

      request(app).get('/api/products/id/0')
        .expect(404)
        .then(() => {
          done();
        });
    });
  });

});

// TODO-LOW:
//   Separate database connection from api
//   Must disconnect from db here because it connects automatically when required
afterAll(async (done) => {
  try {
    await mongoose.connection.close();
    done()
  } catch (error) {
    console.log(error);
    done()
  }
});
