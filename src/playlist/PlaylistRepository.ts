import MusicModel from './MusicModel';
import IPlaylistRepository from './IPlaylistRepository';

import RepositoryException from '../shared/exception/RepositoryException';
import { INSERT_ERROR } from '../shared/repository/constants';

const playlist = async () => [];

export default class PlaylistRepository implements IPlaylistRepository {
  listSongs(): Promise<any> {
    return new Promise(async (resolve: Function, reject: Function) => {
      try {
        const result: Array<MusicModel> = await playlist();
        resolve(result);
      } catch (error) {
        reject(
          new RepositoryException(
            INSERT_ERROR.code,
            INSERT_ERROR.message('Erro listar músicas'),
            error
          )
        );
      }
    });
  }
}
