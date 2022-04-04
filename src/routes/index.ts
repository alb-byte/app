import express from 'express';
import authRouter from './authRouter';
import profileRouter from './profileRouter';
import mediaRouter from './mediaRouter';
import universityRouter from './universityRouter';
import specialityRouter from './specialityRouter';
import postRouter from './postRouter';
import searchRouter from './searchRouter';
import relationRouter from './relationRouter';
import reportRoutes from './reportRoutes';
import AuthMW from '../middlewares/auth';

const router = express.Router();

router.use('/auth', authRouter());
router.use('/media', mediaRouter());
router.use('/posts', AuthMW.authFilter, postRouter());
router.use('/search', AuthMW.authFilter, searchRouter());
router.use('/relations', AuthMW.authFilter, relationRouter());
router.use('/profile', AuthMW.authFilter, profileRouter());
router.use('/universities', AuthMW.authFilter, universityRouter());
router.use('/specialities', AuthMW.authFilter, specialityRouter());
router.use('/reports', AuthMW.authFilter, reportRoutes());
export default router;
