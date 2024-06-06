import { Router } from 'express';
import usersRouter from './usersRouter';
import appointmentsRouter from './appointmentsRouter';
import avatarsRouter from './avatarsRouter';

const router: Router = Router();

router.use('/users', usersRouter);
router.use('/appointments', appointmentsRouter);
router.use('/avatars', avatarsRouter);

export default router;