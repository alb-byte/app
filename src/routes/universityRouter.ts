import express, { Router } from 'express';
import * as UniversityController from '../controllers/university';

export default function (): Router {
  const router = express.Router();
  router.get('/', UniversityController.getAll);
  router.get('/:universityId', UniversityController.getOne);
  router.post('/', UniversityController.create);
  router.put('/:universityId', UniversityController.update);
  router.delete('/:universityId', UniversityController.remove);
  return router;
}
