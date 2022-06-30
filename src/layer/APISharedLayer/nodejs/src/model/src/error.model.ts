import { ValidateInfoModel } from './validate-info.model';

export class HttpError extends Error {
  private statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }

  public getStatusCode(): number {
    return this.statusCode;
  }
}

export class ValidateError extends Error {
  private infoList: ValidateInfoModel[];

  constructor(infoList: ValidateInfoModel[]) {
    super(JSON.stringify(infoList));
    this.infoList = infoList;
  }

  public getInfoList(): ValidateInfoModel[] {
    return this.infoList;
  }
}
