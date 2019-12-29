import { err } from '../dtos/Error';

export default class BaseException extends Error {
  protected code: number;
  public httpStatus: number;

  constructor(code: number, message: string, httpStatus: number, stack?: any) {
    super(message);
    Object.setPrototypeOf(this, BaseException.prototype);
    this.message = message;
    this.code = code;
    this.httpStatus = httpStatus;
    this.stack = stack;
  }

  public toErro(): err {
    return new err({
      code: this.code,
      message: this.message,
      exception: this.stack
    });
  }
}
