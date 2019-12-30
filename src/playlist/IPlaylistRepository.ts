import MusicModel from './MusicModel';

export default interface IPlaylistRepository {
  listSongs(): Promise<Array<MusicModel>>;
  listPlayListByIds(listId: Array<String>): Promise<Array<MusicModel>>;
}
