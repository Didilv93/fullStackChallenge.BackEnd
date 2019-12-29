import MusicModel from './MusicModel';
import IPlaylistRepository from './IPlaylistRepository';

import RepositoryException from '../shared/exception/RepositoryException';
import { INSERT_ERROR } from '../shared/repository/constants';

'use strict';
const fs = require('fs');

export default class PlaylistRepository implements IPlaylistRepository {
  listSongs(): Promise<any> {
    return new Promise(async (resolve: Function, reject: Function) => {
      try {
        await fs.readFile(`./dataSource/${process.env.DATABASE_FILE_NAME}.json`, (err, data) => {
          if (err) throw err;
          const playlist = JSON.parse(data);
          const result: Array<MusicModel> = playlist.map((item: any) => ({
            id: item.id,
            name: item.name,
            artists: item.artists,
            genre: item.genre
          }));
          resolve(result);
        });
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
