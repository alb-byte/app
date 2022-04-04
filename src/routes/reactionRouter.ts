import express, { Router } from 'express';
import * as ReactionController from '../controllers/reaction';

export default function (): Router {
  const router = express.Router({ mergeParams: true });
  router.post('/', ReactionController.create);
  router.delete('/', ReactionController.remove);
  return router;
}
