import { logger } from '../config/logger';
import obterIdLog from '../shared/utils/GetIdLog';
import MusicModel from './MusicModel';
import IPlaylistBLL from './IPlaylistBLL';
import PlaylistRepository from './PlaylistRepository';
import UsersRepository from '../users/UsersRepository';

function sortByPlacement(rankingList: Array<any>) {
  const result = [];
  for (let placement = 1; placement < 6; placement++) {
    let winner = new MusicModel();
    rankingList.forEach((rankingItem: any) => {
      if (rankingItem[placement]) {
        if (
          (!winner.users || rankingItem[placement].nicknames.length > winner.users.length) &&
          !result.find(resultItem => rankingItem.id === resultItem.id)
        ) {
          winner = {
            users: rankingItem[placement].nicknames.map((nickname: string) => ({
              nickname: nickname
            })),
            id: rankingItem.id,
            name: rankingItem.name,
            artists: rankingItem.artists,
            genre: rankingItem.genre
          };
        }
      }
    });
    result.push(winner);
  }
  return result;
}
export default class PlaylistBLL implements IPlaylistBLL {
  private playlistRepository: PlaylistRepository;
  private usersRepository: UsersRepository;

  constructor(playlistRepository: PlaylistRepository, usersRepository: UsersRepository) {
    this.playlistRepository = playlistRepository;
    this.usersRepository = usersRepository;
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

  listPlayListFinalClassification(): Promise<Array<MusicModel>> {
    return new Promise(async (resolve: Function, reject: Function) => {
      try {
        const users = await this.usersRepository.listUsers();
        if (users && users.length > 0) {
          let objPlayList = {};
          users.forEach(user => {
            user.favoriteSongs.forEach((song: any) => {
              if (objPlayList[song.id] && objPlayList[song.id][song.rankingValue]) {
                objPlayList[song.id][song.rankingValue].nicknames.push(user.nickname);
              } else {
                objPlayList = {
                  ...objPlayList,
                  [song.id]: {
                    ...objPlayList[song.id],
                    [song.rankingValue]: {
                      nicknames: [user.nickname]
                    }
                  }
                };
              }
            });
          });
          const rankingList = [];
          const listId = [];
          for (let indexOf in objPlayList) {
            listId.push(indexOf);
            rankingList.push({ ...objPlayList[indexOf], id: indexOf });
          }
          const listMusic = await this.playlistRepository.listPlayListByIds(listId);
          resolve(
            sortByPlacement(rankingList.map((item, index) => ({ ...item, ...listMusic[index] })))
          );
        } else {
          resolve([]);
        }
      } catch (erro) {
        logger.error(`Erro ao listar musicas`, obterIdLog(), erro);
        reject(erro);
      }
    });
  }
}
