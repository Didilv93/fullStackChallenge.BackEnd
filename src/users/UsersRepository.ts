import UserModel from './UserModel';
import IUsersRepository from './IUsersRepository';

import RepositoryException from '../shared/exception/RepositoryException';
import { INSERT_ERROR } from '../shared/repository/constants';

'use strict';
const fs = require('fs');

export default class UsersRepository implements IUsersRepository {
  registerUserVote(nickname: String, favoriteSongs: Array<Object>): Promise<void> {
    return new Promise(async (resolve: Function, reject: Function) => {
      try {
        if (fs.existsSync(`./dataSource/${process.env.DATABASE_USERS_FILE_NAME}.json`)) {
          await fs.readFile(
            `./dataSource/${process.env.DATABASE_USERS_FILE_NAME}.json`,
            'utf8',
            function readFileCallback(err, data) {
              if (err) throw err;
              const users = JSON.parse(data);
              users.push({ nickname: nickname, favoriteSongs: favoriteSongs });
              const json = JSON.stringify(users);
              fs.writeFile(
                `./dataSource/${process.env.DATABASE_USERS_FILE_NAME}.json`,
                json,
                'utf8',
                (err: any) => {
                  throw err;
                }
              );
            }
          );
        } else {
          const json = JSON.stringify([{ nickname: nickname, favoriteSongs: favoriteSongs }]);
          fs.writeFile(
            `./dataSource/${process.env.DATABASE_USERS_FILE_NAME}.json`,
            json,
            'utf8',
            (err: any) => {
              throw err;
            }
          );
        }
      } catch (error) {
        reject(
          new RepositoryException(
            INSERT_ERROR.code,
            INSERT_ERROR.message('Erro registrar músicas'),
            error
          )
        );
      }
    });
  }

  getUser(nickname: String): Promise<any> {
    return new Promise(async (resolve: Function, reject: Function) => {
      try {
        if (fs.existsSync(`./dataSource/${process.env.DATABASE_USERS_FILE_NAME}.json`)) {
          await fs.readFile(
            `./dataSource/${process.env.DATABASE_USERS_FILE_NAME}.json`,
            'utf8',
            (err, data) => {
              if (err) throw err;

              const users = JSON.parse(data);
              const user: UserModel = users.find((item: any) => item.nickname === nickname);
              resolve({
                nickname: nickname,
                favoriteSongs: user && user.favoriteSongs
              });
            }
          );
        } else {
          resolve({
            nickname: nickname
          });
        }
      } catch (error) {
        reject(
          new RepositoryException(
            INSERT_ERROR.code,
            INSERT_ERROR.message('Erro buscar usuário'),
            error
          )
        );
      }
    });
  }
}
