import BaseException from './BaseException';

export default class ControllerException extends BaseException {
  constructor(code: number, message: string, stack?: any) {
    super(code, message, 400, stack);
  }
}
