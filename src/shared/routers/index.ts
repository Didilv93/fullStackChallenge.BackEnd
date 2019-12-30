import { Router } from 'express';
import PlaylistController from '../../playlist/PlaylistController';
import UsersController from '../../users/UsersController';
import logManager from '../middleware';

const playlistController = new PlaylistController();
const usersController = new UsersController();

const routers = Router();

routers.get('/playlist/', logManager, playlistController.listSongs);
routers.get(
  '/playlist/finalClassification/',
  logManager,
  playlistController.listPlayListFinalClassification
);
routers.get('/user/', logManager, usersController.getUser);
routers.get('/users/', logManager, usersController.listUsers);
routers.post('/user/registerVote/', logManager, usersController.registerUserVote);

export { routers };
