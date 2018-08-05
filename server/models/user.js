const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    minlength: 1,
    unique: true, // verifies that the property email does not have the same value as any other doc in the user collection
    validate: {
      // validator: (value) => {
      //   return validator.isEmail(value);
      // },
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      require: true
    },
    token: {
      type: String,
      require: true
    }
  }]
});

// we need to override a method from Mongoose
UserSchema.methods.toJSON = function () {
  var user = this;
  // user.toObject is responsible for taking your mongoose variable and converting
  // it to a regular object where only the properties available on the document exist
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
};

// instance methods

// note we are using a normal function() call because we need access to 'this' which
// an arrrow function does not provide
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();

  user.tokens = user.tokens.concat({ access, token });

  // returns a promise
  // this will allow server.js to chain onto the promise and access the token
  return user.save().then(() => {
    return token;
  });
};

var User = mongoose.model('User', UserSchema);

module.exports = { User };