import { Request, Response } from 'express';

import PlaylistBLL from './PlaylistBLL';
import PlaylistRepository from './PlaylistRepository';
import MusicModel from './MusicModel';
import BaseController from '../shared/controllers/BaseController';
import ControllerException from '../shared/exception/ControllerException';
import { INVALID_URL } from '../shared/controllers/constants';

export default class Controller extends BaseController {
  constructor() {
    super();
  }

  paramsValidate(params: any): void {
    if (params.id && isNaN(Number(params.id))) {
      throw new ControllerException(INVALID_URL.code, INVALID_URL.message);
    }
  }

  getLib(): PlaylistBLL {
    return new PlaylistBLL(new PlaylistRepository());
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
}
