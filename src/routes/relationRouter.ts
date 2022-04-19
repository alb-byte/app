import express, { Router } from 'express';
import * as RelationController from '../controllers/relation';

export default function (): Router {
  const router = express.Router();
  router.get('/subscribers', RelationController.getManySubscribers);
  //
  router.get('/friends', RelationController.getManyFriends);
  router.put('/friends/:userId', RelationController.addFriend);
  router.delete('/friends/:userId', RelationController.deleteFriend);
  //
  router.get('/subscriptions/', RelationController.getManySubscriptions);
  router.put('/subscriptions/:userId', RelationController.createSubscription);
  router.delete('/subscriptions/:userId', RelationController.removeSubscription);
  return router;
}
