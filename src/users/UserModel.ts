export default class UserModel {
  public nickname: string;
  public favoriteSongs: Array<String>;

  constructor(user: UserModel = {} as UserModel) {
    const { nickname = undefined, favoriteSongs = undefined } = user;

    this.nickname = nickname;
    this.favoriteSongs = favoriteSongs;
  }
}
