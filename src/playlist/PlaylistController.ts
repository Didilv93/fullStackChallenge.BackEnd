import { Request, Response } from 'express';

import PlaylistBLL from './PlaylistBLL';
import PlaylistRepository from './PlaylistRepository';
import UsersRepository from '../users/UsersRepository';
import MusicModel from './MusicModel';
import BaseController from '../shared/controllers/BaseController';
import ControllerException from '../shared/exception/ControllerException';
import { INVALID_URL } from '../shared/controllers/constants';

export default class Controller extends BaseController {
  constructor() {
    super();
  }

  getLib(): PlaylistBLL {
    return new PlaylistBLL(new PlaylistRepository(), new UsersRepository());
  }

  listSongs = async (req: Request, res: Response) => {
    try {
      const playlistBLL = this.getLib();
      const playlist: Array<MusicModel> = await playlistBLL.listSongs();
      return res.status(200).json(playlist);
    } catch (error) {
      this.retornoErro(error, res);
    }
  };

  listPlayListFinalClassification = async (req: Request, res: Response) => {
    try {
      const playlistBLL = this.getLib();
      const playlist: Array<MusicModel> = await playlistBLL.listPlayListFinalClassification();
      return res.status(200).json(playlist);
    } catch (error) {
      this.retornoErro(error, res);
    }
  };
}
