import HTTPStatus from 'http-status';
import CategoryModel from './model';

export const createCategory = async (req, res, next) => {
  const { title } = req.body;
  const currentUser = req.user;
  try {
    const category = await CategoryModel.create({
      title,
      creatorId: currentUser.id,
    });
    return res.status(HTTPStatus.CREATED).json({
      message: `Category ${category.title} was created with success`,
      category,
    });
  } catch (error) {
    res.status(HTTPStatus.BAD_REQUEST).json({ error });
  }

  return next();
};
export const updateCategory = async (req, res, next) => {};
export const deleteCategory = async (req, res, next) => {};
export const getAllCategories = async (req, res, next) => {};
