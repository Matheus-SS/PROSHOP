import nodemailer, { Transporter } from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import { IMailTemplate } from '../MailTemplate/IMailTemplateDTO';
import { IMailProvider } from './IMailProvider';
import { ISendEmail } from './ISendMailDTO';

class SendGridMailProvider implements IMailProvider {
  private client!: Transporter;
  private mailTemplateProvider: IMailTemplate;

  constructor(mailTemplateProvider: IMailTemplate) {
    this.mailTemplateProvider = mailTemplateProvider;

    const transporter = nodemailer.createTransport(
      nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY || 'default',
      })
    );

    this.client = transporter;
  }

  public async sendMail({
    to,
    subject,
    templateData,
    from,
  }: ISendEmail): Promise<void> {
    await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe ProShop',
        address: from?.email || 'froste43@gmail.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject: subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}

export default SendGridMailProvider;
