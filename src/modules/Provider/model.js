/* eslint-disable import/no-mutable-exports */
import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import mongoosePaginate from 'mongoose-paginate';

const ProviderSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Provider name is required!'],
      trim: false,
      min: 6,
    },
    email: {
      type: String,
      trim: true,
      validate: {
        validator(email) {
          const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
          return emailRegex.test(email);
        },
        message: '{VALUE} is not a valid email!',
      },
    },
    details: {
      type: String,
      min: 6,
    },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

ProviderSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

ProviderSchema.plugin(mongoosePaginate);

let Provider;

try {
  Provider = mongoose.model('Provider');
} catch (e) {
  Provider = mongoose.model('Provider', ProviderSchema);
}

export default Provider;
