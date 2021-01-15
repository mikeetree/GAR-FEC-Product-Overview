const faker = require('faker');
const database = require('./index.js');

const randomRange = (min, max) => Math.floor(Math.random() * (max - min)) + min;

function arrayOfRandomLengthFrom(min, max, f) {
  const rand = randomRange(min, max);
  const temp = new Array(rand).fill(0);
  return temp.map(f);
}

// TODO-LOW: Should return a unique set of options (no duplicate color/size combos)

const generateOptions = () => ({
  color: faker.commerce.color(),
  size: 'm',
  inventory: randomRange(0, 100),
});

const productGenerator = () => {
  let id = 0;

  return () => {
    const product = {
      product_id: id,
      brand_name: faker.company.companyName(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: {
        base_price: faker.commerce.price(),
        discount: Math.random().toPrecision(2),
      },
      image_urls: arrayOfRandomLengthFrom(1, 5, faker.image.imageUrl),
      options: arrayOfRandomLengthFrom(1, 5, generateOptions),
    };

    id += 1;

    return product;
  };
};

const generateProduct = productGenerator();
const numProductsToGenerate = process.argv[2] || 10;
const products = [];

console.log(`Seeding database with ${numProductsToGenerate} products`);

for (let i = 0; i < numProductsToGenerate; i += 1) {
  products.push(generateProduct());
}

database.addProducts(products)
  .then((r) => console.log(`Seeded database with ${r.length} products`))
  .catch((e) => console.log(e));
