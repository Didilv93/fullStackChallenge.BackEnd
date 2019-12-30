import MusicModel from './MusicModel';

export default interface IPlaylistBLL {
  listSongs(): Promise<Array<MusicModel>>;
  listPlayListByIds(listId: Array<String>): Promise<Array<MusicModel>>;
}
