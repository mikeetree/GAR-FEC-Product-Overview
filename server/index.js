const express = require('express');
const api = require('./api');

const app = express();
const port = process.argv[2] || 3000;

app.use('/api', api);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
