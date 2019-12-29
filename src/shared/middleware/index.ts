import * as contextService from 'request-context';
import { Request, Response, NextFunction } from 'express';
import { v4 } from 'uuid';

export default function logManager(req: Request, res: Response, next: NextFunction) {
  let idLog: string;

  if (!req.header('idLog')) idLog = v4();
  else idLog = req.header('idLog');

  res.header('idLog', idLog);
  contextService.set('request:idLog', idLog);

  next();
}
