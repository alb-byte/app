import express, { Router } from 'express';
import * as ProfileController from '../controllers/profile';
import ratingRouter from './ratingRouter';
import reviewRouter from './reviewRouter';

export default function (): Router {
  const router = express.Router();
  router.get('/', ProfileController.me);
  router.get('/:userId', ProfileController.getOne);
  router.put('/', ProfileController.edit);
  router.put('/:userId/userInfo', ProfileController.editInfo);
  router.use('/:userId/reviews', reviewRouter());
  router.use('/:userId/rating', ratingRouter());
  return router;
}
