const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const loaderConfigs = require('../../config/protoConfig');
const serverConfigs = require('../../config/serverConfig');

const calypsoDefinition = protoLoader.loadSync(
  path.resolve(__dirname, 'protos', 'calypso.proto'),
  loaderConfigs,
);

const calypsoDef = grpc.loadPackageDefinition(calypsoDefinition);

const client = new calypsoDef.UserService(serverConfigs.target, grpc.credentials.createInsecure());
module.exports = client;