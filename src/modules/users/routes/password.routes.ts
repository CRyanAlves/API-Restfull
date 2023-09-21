import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import ForgotPasswordController from '../controller/ForgotPasswordController';
import ResetPasswordController from '../controller/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordEmailController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordEmailController.create,
);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password'))
    },
  }),
  resetPasswordController.create,
);

export default passwordRouter;
