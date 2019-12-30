import { logger } from '../config/logger';
import obterIdLog from '../shared/utils/GetIdLog';
import MusicModel from './MusicModel';
import IPlaylistBLL from './IPlaylistBLL';
import PlaylistRepository from './PlaylistRepository';

export default class PlaylistBLL implements IPlaylistBLL {
  private playlistRepository: PlaylistRepository;

  constructor(playlistRepository: PlaylistRepository) {
    this.playlistRepository = playlistRepository;
  }

  listSongs(): Promise<Array<MusicModel>> {
    return new Promise(async (resolve: Function, reject: Function) => {
      try {
        resolve(await this.playlistRepository.listSongs());
      } catch (erro) {
        logger.error(`Erro ao listar musicas`, obterIdLog(), erro);
        reject(erro);
      }
    });
  }

  listPlayListByIds(listId: Array<String>): Promise<Array<MusicModel>> {
    return new Promise(async (resolve: Function, reject: Function) => {
      try {
        resolve(await this.playlistRepository.listPlayListByIds(listId));
      } catch (erro) {
        logger.error(`Erro ao listar musicas`, obterIdLog(), erro);
        reject(erro);
      }
    });
  }
}
