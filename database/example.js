const database = require('./index.js');

const testProduct = {
  product_id: 1,
  brand_name: 'A brand name',
  name: 'Cool Jacket',
  description: 'This jacket is super COOL and keeps you super WARM',
  price: {
    base_price: 500.37,
    discount: 0.25,
  },
  image_urls: ['http://placecorgi.com/250'],
  options: [{
    color: 'gray',
    size: 'm',
    inventory: '5000000',
  }],
};

database.addProduct(testProduct);
