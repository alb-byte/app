import express, { Router } from 'express';
import * as RatingController from '../controllers/rating';

export default function (): Router {
  const router = express.Router({ mergeParams: true });
  router.post('/', RatingController.create);
  router.delete('/', RatingController.remove);
  return router;
}
