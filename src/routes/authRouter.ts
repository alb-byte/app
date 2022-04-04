import express, { Router } from 'express';
import * as AuthController from '../controllers/auth';
// const validators = require("../libs/validation/validationMW");
// const authMW = require('../libs/auth/authMW');

export default function (): Router {
  const router = express.Router();
  router.post(
    '/registration',
    // validators.userValidator.firstName(validators.locations.body),
    // validators.userValidator.lastName(validators.locations.body),
    // validators.userValidator.email(validators.locations.body),
    // validators.userValidator.password(validators.locations.body),
    // validators.validationExceptionHandler,
    // authController.register
    AuthController.registration,
  );
  router.post(
    '/login',
    // validators.userValidator.email(validators.locations.body),
    // validators.userValidator.password(validators.locations.body),
    // validators.validationExceptionHandler,
    // authController.login
    AuthController.login,
  );
  router.post('/confirmation', AuthController.confirmation);
  router.post('/resend', AuthController.resend);
  router.post(
    '/refresh',
    // authController.refreshToken
    AuthController.refresh,
  );
  router.post(
    '/logout',
    // authMW.authFilter,
    // authController.logout
    AuthController.logout,
  );

  return router;
}
