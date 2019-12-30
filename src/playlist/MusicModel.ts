export default class MusicModel {
  public id: string;
  public name: string;
  public artists: string;
  public genre: string;
  public users: Array<string>;

  constructor(music: MusicModel = {} as MusicModel) {
    const {
      id = undefined,
      name = undefined,
      artists = undefined,
      genre = undefined,
      users = undefined
    } = music;

    this.id = id;
    this.name = name;
    this.artists = artists;
    this.genre = genre;
    this.users = users;
  }
}
