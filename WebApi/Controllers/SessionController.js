const CalypsoProvider = require('../infra/providers/CalypsoProvider')

class SessionController {
  async store (request, response) {
    const { email, password } =  request.body;

    const tokenCall = await new Promise((resolve, reject) => {
      CalypsoProvider.loginUser({ user: { email, password } }, (err, resp) => {
        if(err) {
          reject(err)
        }
        else
          resolve(resp)
      }) 
    })

    return response.json(tokenCall)
  } 
}

module.exports = new SessionController();