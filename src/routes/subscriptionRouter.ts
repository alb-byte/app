import express, { Router } from 'express';
import * as SubscriptionController from '../controllers/relation';

export default function (): Router {
  const router = express.Router();
  router.get('/', SubscriptionController.getSubscriptions);
  router.post('/subscribe/:userId', SubscriptionController.subscribe);
  router.post('/unsubscribe/:userId', SubscriptionController.unsubscribe);
  return router;
}
