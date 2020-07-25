const acl = require('express-acl');

const configObject = {
  filename: 'nacl.json',
  path: 'src/config',
  baseUrl: '/',
  defaultRole: 'anonymous', // if no rule is returned
  decodedObjectName: 'user',
  roleSearchPath: 'user.role',
};
const responseObject = {
  status: 'Access Denied',
  message: 'You are not authorized to access this resource',
};

acl.config(configObject, responseObject);

export default acl;
