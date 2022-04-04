import express, { Router } from 'express';
import * as RelationController from '../controllers/relation';

export default function (): Router {
  const router = express.Router();
  router.get('/subscribers', RelationController.getSubscribers);
  //
  router.get('/friends', RelationController.getFriends);
  router.put('/friends/:userId', RelationController.addFriend);
  router.delete('/friends/:userId', RelationController.deleteFriend);
  //
  router.get('/subscriptions/', RelationController.getSubscriptions);
  router.put('/subscriptions/:userId', RelationController.addSubscription);
  router.delete('/subscriptions/:userId', RelationController.deleteSubscription);
  return router;
}
