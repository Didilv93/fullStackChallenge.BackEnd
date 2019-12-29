import { logger } from '../config/logger';
import obterIdLog from '../shared/utils/GetIdLog';
import UserModel from './UserModel';
import IUsersBLL from './IUsersBLL';
import UsersRepository from './UsersRepository';

export default class UsersBLL implements IUsersBLL {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  registerUserVote(nickname: String, favoriteSongs: Array<String>): Promise<void> {
    return new Promise(async (resolve: Function, reject: Function) => {
      try {
        await this.usersRepository.registerUserVote(nickname.toLowerCase(), favoriteSongs);
      } catch (erro) {
        logger.error(`Erro registrar músicas`, obterIdLog(), erro);
        reject(erro);
      }
    });
  }

  getUser(nickname: String): Promise<UserModel> {
    return new Promise(async (resolve: Function, reject: Function) => {
      try {
        resolve(await this.usersRepository.getUser(nickname.toLowerCase()));
      } catch (erro) {
        logger.error(`Erro ao buscar usuário por apilido`, obterIdLog(), erro);
        reject(erro);
      }
    });
  }
}
