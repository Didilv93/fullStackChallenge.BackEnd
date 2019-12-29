import { Router } from 'express';
import Controller from '../../playlist/PlaylistController';
import logManager from '../middleware';

const controller = new Controller();
const routers = Router();

routers.get('/songs/', logManager, controller.listSongs);

export { routers };
