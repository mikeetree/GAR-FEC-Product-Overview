const mongoose = require('mongoose');

const uri = 'mongodb://localhost/fec-productoverview';

let Product;

const productSchema = mongoose.Schema({
  product_id: {
    type: Number,
    validate: {
      isAsync: true,
      validator(productId, cb) {
        Product.findOne({ product_id: productId })
          .then((r) => cb(r === null));
      },
    },
  },
  brand_name: String,
  name: String,
  description: String,
  price: {
    base_price: Number,
    discount: Number,
  },
  image_urls: [String],
  options: [{
    color: String,
    size: String,
    inventory: Number,
  }],
});

mongoose.connect(uri);
Product = mongoose.model('products', productSchema);

const addProduct = (product) => {
  const newProduct = new Product(product);
  return newProduct.save();
};

module.exports.addProduct = addProduct;
