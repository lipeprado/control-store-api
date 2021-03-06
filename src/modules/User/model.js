/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
import mongoose, { Schema } from 'mongoose';

import { hashSync } from 'bcrypt-nodejs';
import uniqueValidator from 'mongoose-unique-validator';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required!'],
      trim: true,
      validate: {
        validator(email) {
          const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
          return emailRegex.test(email);
        },
        message: '{VALUE} is not a valid email!',
      },
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      trim: true,
      minlength: [6, 'Password need to be longer!'],
      validate: {
        validator(password) {
          return password.length >= 6 && password.match(/\d+/g);
        },
      },
    },
  },
  { timestamps: true },
);

UserSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

// Hash the user password on creation
UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
    return next();
  }
  return next();
});

function _hashUpdatePassword(password) {
  return hashSync(password);
}
UserSchema.pre('findOneAndUpdate', function (next) {
  this.findOneAndUpdate(
    {},
    { password: _hashUpdatePassword(this.getUpdate().$set.password) },
  );
  return next();
});
UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },
  /**
   * Parse the user object in data we wanted to send when is auth
   *
   * @public
   * @returns {Object} User - ready for auth
   */
  toAuthJSON() {
    return {
      token: `JWT ${this.createToken()}`,
    };
  },
};

// eslint-disable-next-line import/no-mutable-exports
let User;

try {
  User = mongoose.model('User');
} catch (e) {
  User = mongoose.model('User', UserSchema);
}

export default User;
