const User = require('./models/UserSchema');
const grpc = require('@grpc/grpc-js')
const authConfig = require('./config/authConfig');
const { verify } = require('jsonwebtoken');

module.exports = {
  async getUserById(
    call,
    callback
  ) {
    const { id } = call.request;
    const user = await User.findById(id);

    if (!user)
      return callback({
        code: grpc.status.NOT_FOUND,
        details: `User not found`,
      });

    const userResponse = user.toObject()
    userResponse.id = user._id;

    return callback(null, {
      user: { ...userResponse, password: undefined },
    });
  },

  async getAll(
    call,
    callback
  ) {
    const user = await User.find({});

    if (!user)
      return callback({
        code: grpc.status.NOT_FOUND,
        details: `Users not found`,
      });
    

    const list = user.map(element => {
      const user = element.toObject();
      user.id = element._id;
      return { ...user, password: undefined }
    })

    return callback(null, {
      users: list,
    });
  },

  async registerUser(
    call,
    callback
  ) {
    const { email, username, password } = call.request.user;

    const user = await User.create({
      email,
      username,
      password,
    });

    user.id = user._id;

    return callback(null, { user });
    // registrar no banco e retornar usuário com id.
  },

  async loginUser(call, callback) {
    
    const { email, password } = call.request.user;
    const user = await User.findOne({ email });
    if (!user) {
      return callback({
        code: grpc.status.NOT_FOUND,
        details: 'User not found!',
      });
    }

    if (!(await user.compareHash(password))) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: `Username and password does match`,
      });
    }

    return callback(null, {
      token: User.generateToken(user),
    });
  },

  async authorize(call, callback) {
    {
      const { token } = call.request;
      try {
        const decoded = verify(token, authConfig.secret);
        const { id } = decoded;

        const user = await User.findById(id);

        if (!user)
          return callback({
            code: grpc.status.NOT_FOUND,
            details: `User email or password is invalid`,
          });

        const userResponse = user.toObject();
        userResponse.id = user._id;

        return callback(null, {
          user: { ...userResponse, password: undefined },
        });

      } catch {
        return callback({
            code: grpc.status.UNIMPLEMENTED,
            details: `Invalid JWT token`,
          });
      }
    }
  }
};