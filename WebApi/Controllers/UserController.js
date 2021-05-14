const CalypsoProvider = require('../infra/providers/CalypsoProvider')
class UserController {
   async index(request, response) {
      const users = await new Promise((resolve, reject) => {
       CalypsoProvider.getAll({ }, (err, resp) => {
          if(err)
             reject(err)
          else
             resolve(resp)
        }) 
      })
 
     return response.json(users)
   }
   async show(request, response) { 
      const { id } =  request.params;

      const user = await new Promise((resolve, reject) => {
       CalypsoProvider.getUserById({ id }, (err, resp) => {
          if(err)
             reject(err)
          else
             resolve(resp)
        }) 
      })
 
     return response.json(user)
   }
   async store (request, response) {
      const { email, username, password } =  request.body;

     const user = await new Promise((resolve, reject) => {
      CalypsoProvider.registerUser({ user: { email, username, password } }, (err, resp) => {
         if(err)
            reject(err)
         else
            resolve(resp)
       }) 
     })

    return response.json(user)
   }
}


module.exports = new UserController();