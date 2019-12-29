import { Request, Response } from 'express';
import BaseException from '../exception/BaseException';
import { logger } from '../../config/logger';
import getIdLog from '../utils/GetIdLog';

export default abstract class BaseController {
  protected retornoErro(error: any, res: Response) {
    if (error instanceof BaseException) {
      logger.error(error.message, getIdLog(), error.stack);

      res.status(error.httpStatus).json(error.toErro());
    } else {
      logger.error(error.message, getIdLog(), error.stack);

      res.status(500).json(error);
    }
  }
}
