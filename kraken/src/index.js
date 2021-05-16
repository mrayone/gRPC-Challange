const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
require('./database');
const implementation = require('./implementations');

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, 'protos', 'message.proto'),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  },
);

const proto = grpc.loadPackageDefinition(packageDefinition);

function main () {
  const server = new grpc.Server();
  server.addService(proto.PurchaseService.service, implementation);
  server.bindAsync('localhost:3335', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

main();