const express = require('express');
const database = require('../database');

const api = express.Router();

api.get('/products/all', (req, res) => {
  database.getAllProducts()
    .then((products) => {
      res.send(products);
    })
    .catch(() => res.status(404).end());
});

api.get('/products/id/:productId(\\d+)', (req, res) => {
  database.getProductById(req.params.productId)
    .then((product) => {
      res.send(product);
    })
    .catch(() => res.status(404).end());
});

module.exports = api;
