import { ISendEmail } from './ISendMailDTO';
export interface IMailProvider {
  sendMail(data: ISendEmail): Promise<void>;
}
