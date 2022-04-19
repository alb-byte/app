import express, { Router } from 'express';
import * as SpecialityController from '../controllers/speciality';

export default function (): Router {
  const router = express.Router();
  router.get('/', SpecialityController.getMany);
  router.get('/:specialityId', SpecialityController.getOne);
  router.post('/', SpecialityController.create);
  router.put('/:specialityId', SpecialityController.update);
  router.delete('/:specialityId', SpecialityController.remove);
  return router;
}
