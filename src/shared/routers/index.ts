import { Router } from 'express';
import PlaylistController from '../../playlist/PlaylistController';
import UsersController from '../../users/UsersController';
import logManager from '../middleware';

const playlistController = new PlaylistController();
const usersController = new UsersController();

const routers = Router();

routers.get('/songs/', logManager, playlistController.listSongs);
routers.get('/user/', logManager, usersController.getUser);
routers.post('/user/registerVote/', logManager, usersController.registerUserVote);

export { routers };
