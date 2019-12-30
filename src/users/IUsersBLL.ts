import UserModel from './UserModel';

export default interface IUsersBLL {
  getUser(nickname: String): Promise<UserModel>;
  listUsers(): Promise<Array<UserModel>>;
  registerUserVote(nickname: String, favoriteSongs: Array<Object>): Promise<void>;
}
