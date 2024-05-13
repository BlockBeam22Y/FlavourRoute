import { Router } from 'express';
import { getUsers, getUserById, registerUser, loginUser } from '../controllers/usersController';
import validateUserData from '../middlewares/validateUserData';

const usersRouter: Router = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/register', validateUserData, registerUser);
usersRouter.post('/login', loginUser);

export default usersRouter;