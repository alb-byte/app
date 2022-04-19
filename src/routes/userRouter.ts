import express, { Router } from 'express';
import * as UsersController from '../controllers/users';

export default function (): Router {
  const router = express.Router();
  router.get('/', UsersController.getUnApprovedUsers);
  router.put('/:userId/approve', UsersController.approveUser);
  router.put('/:userId/block', UsersController.blockUser);
  return router;
}
