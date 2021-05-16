const KrakenProvider = require('../infra/providers/KrakenProvider')
class PurchaseController {
   async index(request, response) {
      const { id: userId } =  request.user;
        const purchases = await new Promise((resolve, reject) => {
        KrakenProvider.getAll({ userId }, (err, resp) => {
            if(err)
              reject(err)
            else
              resolve(resp)
          }) 
        })
  
      return response.json(purchases)
   }
   async show(request, response) { 
      const { id: userId } =  request.user;
      const { id } = request.params;

      const purchase = await new Promise((resolve, reject) => {
        KrakenProvider.getById({ id, userId }, (err, resp) => {
          if(err)
              reject(err)
          else
              resolve(resp)
        }) 
      })

      return response.json(purchase)
   }
   async store (request, response) {
      const { title, description, price } =  request.body;
      const { id: userId } =  request.user;

      const purchase = await new Promise((resolve, reject) => {
      KrakenProvider.purchase({ title, description, price, userId }, (err, resp) => {
          if(err)
            reject(err)
          else
            resolve(resp)
        }) 
      })

      return response.json(purchase)
   }
}


module.exports = new PurchaseController();