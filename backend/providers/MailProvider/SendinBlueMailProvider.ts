import nodemailer, { Transporter } from 'nodemailer';
import { IMailTemplate } from '../MailTemplate/IMailTemplateDTO';
import { IMailProvider } from './IMailProvider';
import { ISendEmail } from './ISendMailDTO';

class SendinBlueMailProvider implements IMailProvider {
  private client!: Transporter;
  private mailTemplateProvider: IMailTemplate;

  constructor(mailTemplateProvider: IMailTemplate) {
    this.mailTemplateProvider = mailTemplateProvider;

    const transporter = nodemailer.createTransport({
      host: process.env.SENDINBLUE_HOST,
      port: Number(process.env.SENDINBLUE_PORT),
      auth: {
        user: process.env.SENDINBLUE_USER,
        pass: process.env.SENDINBLUE_PASS,
      },
    });
    this.client = transporter;
  }

  public async sendMail({
    to,
    subject,
    templateData,
    from,
  }: ISendEmail): Promise<void> {
    const message = await this.client.sendMail({
      replyTo: '@no-reply',
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

    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
  }
}

export default SendinBlueMailProvider;
