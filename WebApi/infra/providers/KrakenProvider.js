const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const loaderConfigs = require('../../config/protoConfig');
const serverConfigs = require('../../config/serverConfig');

const krakenDefinition = protoLoader.loadSync(
  path.resolve(__dirname, 'protos', 'kraken.proto'),
  loaderConfigs,
);

const krakenDef = grpc.loadPackageDefinition(krakenDefinition);

const client = new krakenDef.PurchaseService(serverConfigs.targetKraken, grpc.credentials.createInsecure());
module.exports = client;