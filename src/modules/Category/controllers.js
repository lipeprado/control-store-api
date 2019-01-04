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

export const updateCategory = async (req, res, next) => {
  const currentUser = req.user;
  const { id } = req.params;

  const { body } = req;
  try {
    const updatedCategory = await CategoryModel.findOneAndUpdate(
      {
        creatorId: currentUser.id,
        _id: id,
      },
      body,
      { new: true },
    );
    if (!updatedCategory) {
      return res
        .status(HTTPStatus.NOT_FOUND)
        .json({ message: 'Category not Found' });
    }

    return res.status(HTTPStatus.OK).json(updatedCategory);
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
};

export const deleteCategory = async (req, res, next) => {
  const currentUser = req.user;
  const { id } = req.params;
  try {
    const deletedCategory = await CategoryModel.findOneAndDelete({
      creatorId: currentUser.id,
      _id: id,
    });
    if (!deletedCategory) {
      return res
        .status(HTTPStatus.NOT_FOUND)
        .json({ message: 'Category not Found' });
    }
    return res
      .status(HTTPStatus.OK)
      .json({ message: 'Category deleted with success.' });
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
};

export const getAllCategories = async (req, res, next) => {
  const currentUser = req.user;

  const query = { creatorId: currentUser.id };

  try {
    const categories = await CategoryModel.find(query).sort({ title: 1 });
    return res.status(HTTPStatus.OK).json({ categories });
  } catch (error) {
    res.status(HTTPStatus.BAD_REQUEST).json({ error });
  }
  return next();
};
