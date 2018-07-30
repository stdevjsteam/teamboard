require('ts-node/register');
require('dotenv/config');

const setup = require('./setup').default;

module.exports = async function() {
  await setup();
};
