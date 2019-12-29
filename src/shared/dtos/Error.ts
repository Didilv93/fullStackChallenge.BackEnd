export class err {
  public code: number;
  public message: string;
  public exception: any;

  constructor(error: err = {} as err) {
    const { code = undefined, message = undefined, exception = undefined } = error;

    this.code = code;
    this.message = message;
    this.exception = exception;
  }
}
