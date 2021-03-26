import { IParseMailTemplateDTO } from '../MailTemplate/IParseMailTemplateDTO';

export interface IMailTemplate {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
