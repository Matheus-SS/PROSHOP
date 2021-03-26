import { IParseMailTemplateDTO } from '../MailTemplate/IParseMailTemplateDTO';

export interface IMailContact {
  name: string;
  email: string;
}

export interface ISendEmail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
