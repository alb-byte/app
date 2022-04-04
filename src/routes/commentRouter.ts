import express, { Router } from 'express';
import * as CommentController from '../controllers/comment';

export default function (): Router {
  const router = express.Router({ mergeParams: true });
  router.get('/', CommentController.getMany);
  router.get('/:commentId', CommentController.getOne);
  router.post('/', CommentController.create);
  router.put('/:commentId', CommentController.update);
  router.delete('/:commentId', CommentController.remove);
  return router;
}
