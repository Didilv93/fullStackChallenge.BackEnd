import UserModel from './UserModel';

export default interface IUsersBLL {
  getUser(nickname: String): Promise<UserModel>;
  registerUserVote(nickname: String, favoriteSongs: Array<String>): Promise<void>;
}
