import express, { Router } from 'express';
import * as PostController from '../controllers/post';
import * as FeedController from '../controllers/feed';
import commentRouter from './commentRouter';
import reactionRouter from './reactionRouter';

export default function (): Router {
  const router = express.Router();
  router.get('/', PostController.getMany);
  router.get('/feed', FeedController.getMany);
  router.get('/:postId', PostController.getOne);
  router.post('/', PostController.create);
  router.put('/:postId', PostController.update);
  router.delete('/:postId', PostController.remove);
  router.use('/:postId/comments', commentRouter());
  router.use('/:postId/reactions', reactionRouter());
  return router;
}
