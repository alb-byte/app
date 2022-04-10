import express, { Router } from 'express';
import * as AuthController from '../controllers/auth';

export default function (): Router {
  const router = express.Router();
  router.post('/registration', AuthController.registration);
  router.post('/login', AuthController.login);
  router.post('/confirmation', AuthController.confirmation);
  router.post('/resend', AuthController.resend);
  router.post('/refresh', AuthController.refresh);
  router.post('/logout', AuthController.logout);

  return router;
}
