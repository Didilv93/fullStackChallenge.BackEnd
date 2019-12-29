import BaseException from './BaseException';

export default class RepositorioException extends BaseException {
  constructor(code: number, message: string, stack?: any) {
    super(code, message, 500, stack);
  }
}
