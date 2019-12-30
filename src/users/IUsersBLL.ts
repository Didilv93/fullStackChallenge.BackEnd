import UserModel from './UserModel';

export default interface IUsersBLL {
  getUser(nickname: String): Promise<UserModel>;
  registerUserVote(nickname: String, favoriteSongs: Array<Object>): Promise<void>;
}
