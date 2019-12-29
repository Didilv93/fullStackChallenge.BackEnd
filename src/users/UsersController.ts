import { Request, Response } from 'express';

import UsersBLL from './UsersBLL';
import UsersRepository from './UsersRepository';
import UserModel from './UserModel';
import BaseController from '../shared/controllers/BaseController';
import ControllerException from '../shared/exception/ControllerException';
import { INVALID_URL } from '../shared/controllers/constants';

export default class Controller extends BaseController {
  constructor() {
    super();
  }

  paramsValidate(params: any): void {
    if (!params.nickname) {
      throw new ControllerException(INVALID_URL.code, INVALID_URL.message);
    }
    if (!!params.favoriteSongs) {
      params.favoriteSongs.forEach((item: String) => {
        if (!item) {
          throw new ControllerException(INVALID_URL.code, INVALID_URL.message);
        }
      });
    }
  }

  getLib(): UsersBLL {
    return new UsersBLL(new UsersRepository());
  }

  getUser = async (req: Request, res: Response) => {
    try {
      const usersBLL = this.getLib();
      this.paramsValidate(req.query);
      const users: UserModel = await usersBLL.getUser(req.query.nickname);
      return res.status(200).json(users);
    } catch (error) {
      this.retornoErro(error, res);
    }
  };

  registerUserVote = async (req: Request, res: Response) => {
    try {
      const {
        body: { params }
      } = req;
      const usersBLL = this.getLib();
      this.paramsValidate(params);
      await usersBLL.registerUserVote(params.nickname, params.favoriteSongs);
      return res.status(200);
    } catch (error) {
      this.retornoErro(error, res);
    }
  };
}