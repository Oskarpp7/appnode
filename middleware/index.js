const auth = require('./auth');
const roleCheck = require('./roleCheck');
const tenant = require('./tenant');

module.exports = {
  ...auth,
  ...roleCheck,
  ...tenant
};
