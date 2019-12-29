import MusicModel from './MusicModel';

export default interface IPlaylistRepository {
  listSongs(): Promise<MusicModel>;
}
