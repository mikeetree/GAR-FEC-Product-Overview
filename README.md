# GAR-FEC-Product-Overview

## Instructions:
- fork (optional) and clone this repo
- `npm install`
- ensure mongodb is installed and running on your machine
- `npm run db:seed [x]` to seed the database with fake data, where `x` is the desired number of entries
- to be continued...

## API Methods:
- GET /api/products/id/x
  - Returns the product document with product_id of x
- GET /api/products/all
  - Returns all product documents
- GET /api/products/random
  - Returns a random product document

## Tests:
- Product API:
  - `npm run test:api`
