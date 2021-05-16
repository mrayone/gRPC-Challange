const authConfig = require('../config/authConfig');
const { verify } = require('jsonwebtoken');
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
      const decoded = verify(token, authConfig.secret);
      const { id } = decoded;
      
      request.user = {
        id,
      };
      
      return next();
    } catch {
      return response.json({error: 'Invalid JWT token'}, 401);
    }
  }
}