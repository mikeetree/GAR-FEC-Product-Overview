const mongoose = require('mongoose');

const uri = 'mongodb://localhost/fec-productoverview';

let Product;

const productSchema = mongoose.Schema({
  product_id: {
    type: Number,
    validate: {
      validator(productId) {
        return Product.findOne({ product_id: productId })
          .then((r) => (r === null));
      },
      message: 'Product Id validation failed, duplicate id found',
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

Product = mongoose.model('products', productSchema);

let db;

(async () => {
  db = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
})();

const disconnect = () => db.disconnect();

const clearProducts = () => Product.deleteMany({});

const addProduct = (product) => {
  const newProduct = new Product(product);
  return newProduct.save();
};

const addProducts = (products) => (
  Product.insertMany(products)
);

const getProductById = (productId) => (
  Product.findOne({ product_id: productId }).exec()
);

const getAllProducts = () => (
  Product.find({}).exec()
);

const getRandomProduct = async () => {
  const count = await Product.countDocuments({}).exec();
  const rand = Math.floor(Math.random() * count);

  return Product.findOne({}).skip(rand).exec();
};

module.exports.addProduct = addProduct;
module.exports.addProducts = addProducts;
module.exports.getProductById = getProductById;
module.exports.getAllProducts = getAllProducts;
module.exports.getRandomProduct = getRandomProduct;
module.exports.clearProducts = clearProducts;
module.exports.disconnect = disconnect;
