import express, { Router } from 'express';
import * as ReviewController from '../controllers/review';

export default function (): Router {
  const router = express.Router({ mergeParams: true });
  router.get('/', ReviewController.getMany);
  router.get('/:reviewId', ReviewController.getOne);
  router.post('/', ReviewController.create);
  router.put('/:reviewId', ReviewController.update);
  router.delete('/:reviewId', ReviewController.remove);
  return router;
}
