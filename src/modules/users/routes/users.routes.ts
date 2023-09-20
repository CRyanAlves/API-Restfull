import { Router } from 'express';
import UsersController from '../controller/UsersController';
import { Joi, Segments, celebrate } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import UserAvatarController from '../controller/UserAvatarController';
import uploadConfig from '@config/upload';

const usersRouter = Router();
const usersController = new UsersController();
const avatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  avatarController.update,
);

export default usersRouter;
