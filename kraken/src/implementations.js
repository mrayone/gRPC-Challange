const Purchase = require('./models/PurchaseSchema');

module.exports = {
  async purchase(call, callback){
    const { title, description, price, userId  } = call.request;
    
    const purchase = await Purchase.create({
      title,
      description,
      price,
      userId
    });

    const purchaseResponse = purchase.toObject();
    purchaseResponse.id = purchase._id;

    return callback(null, { ...purchaseResponse });
  },
  async getById(call, callback){
    const { id, userId  } = call.request;
    
    const purchase = await Purchase.findOne({ "_id": id, userId  })

    if(!purchase) {
      return callback({
        code: grpc.status.NOT_FOUND,
        details: 'Purchase not found!',
      });
    }

    const purchaseResponse = purchase.toObject();
    purchaseResponse.id = purchase._id;
    return callback(null, { ...purchaseResponse });
  },
  async getAll(call, callback) {
    const { userId  } = call.request;

    const purchases = await Purchase.find({ userId });

    return callback(null, { purchases: purchases });
  }
}