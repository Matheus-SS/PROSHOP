import { IMailProvider } from '../IMailProvider';
import { ISendEmail } from '../ISendMailDTO';

export default class MockMailProvider implements IMailProvider {
  private messages: ISendEmail[] = [];

  public async sendMail(message: ISendEmail) {
    this.messages.push(message);
  }
}
