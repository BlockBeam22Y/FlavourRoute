import { Router } from 'express';
import { uploadAvatar, deleteAvatar } from '../controllers/avatarsController';
import multerUpload from '../config/multerUpload';

const avatarsRouter: Router = Router();

avatarsRouter.post('/upload', multerUpload.single('file'), uploadAvatar);
avatarsRouter.delete('/:id', deleteAvatar);

export default avatarsRouter;