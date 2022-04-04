import express, { Router } from 'express';
import * as MediaController from '../controllers/media';
import MediaMW from '../middlewares/media';
import AuthMW from '../middlewares/auth';

export default function (): Router {
  const router = express.Router();
  router.put('/',AuthMW.authFilter, MediaMW.single('file'), MediaController.upload);
  router.get('/sm/:fileName', MediaController.getSm);
  router.get('/md/:fileName', MediaController.getMd);
  router.get('/lg/:fileName', MediaController.getLg);
  return router;
}
