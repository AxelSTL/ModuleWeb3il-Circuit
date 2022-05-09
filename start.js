const app = require('./app');

const server = app.listen(8080, () => {
  console.log(`Express is running on port ${server.address().port}`);
});
