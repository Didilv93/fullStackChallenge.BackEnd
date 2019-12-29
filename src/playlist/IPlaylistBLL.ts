import MusicModel from './MusicModel';

export default interface IPlaylistBLL {
  listSongs(): Promise<Array<MusicModel>>;
}
