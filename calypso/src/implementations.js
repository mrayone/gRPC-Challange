const User = require('./models/UserSchema');
const grpc = require('@grpc/grpc-js')
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

    user.id = user._id;

    return callback(null, {
      user: { ...user.toObject(), password: undefined },
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
      element.id = element._id;
      const user = element.toObject();
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
    console.log(call.request)
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
};