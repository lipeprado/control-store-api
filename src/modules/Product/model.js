/* eslint-disable import/no-mutable-exports */
import mongoose, { Schema } from 'mongoose';

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Category title is required!'],
      min: 6,
      max: 20,
    },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

let Category;

try {
  Category = mongoose.model('Category');
} catch (e) {
  Category = mongoose.model('Category', CategorySchema);
}

export default Category;
