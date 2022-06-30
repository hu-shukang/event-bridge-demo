import { v4 } from 'uuid';

export class CryptoUtil {

  public id(): string {
    return v4();
  }
}
