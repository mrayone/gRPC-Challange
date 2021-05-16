const CalypsoProvider = require('../infra/providers/CalypsoProvider');

module.exports = {
  async ensureAuthenticated(
    request,
    response,
    next,
  ) {
    const { authorization } = request.headers;
  
    if (!authorization) {
      throw new AppError('Token is missing.', 401);
    }
  
    const [, token] = authorization.split(' ');
    try {
      const userResponse = await new Promise((resolve, reject) => {
        CalypsoProvider.authorize({token}, (err, resp) => {
          if(err){
            reject(err)
          } else 
            resolve(resp)
        })
      })
      
      request.user = userResponse.user
      
      return next();
    } catch(error) {
      return response.status(401).json({error: error.details});
    }
  }
}