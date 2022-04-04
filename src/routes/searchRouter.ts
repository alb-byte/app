import express, { Router } from 'express';
import * as SearchController from '../controllers/search';

export default function (): Router {
  const router = express.Router();
  router.post('/users', SearchController.searchUser);
  router.post('/doctors', SearchController.searchDoctor);
  return router;
}
