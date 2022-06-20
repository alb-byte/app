import express, { Router } from 'express';
import * as ReportController from '../controllers/report';
import Filters from '../middlewares/auth';

export default function (): Router {
  const router = express.Router({ mergeParams: true });
  router.get('/', ReportController.getMany);
  router.get('/:reportId', Filters.adminFilter, ReportController.getOne);
  router.post('/', ReportController.create);
  router.put('/:reportId', ReportController.update);
  router.delete('/:reportId', ReportController.remove);
  return router;
}
