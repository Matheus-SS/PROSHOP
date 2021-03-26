import nodemailer, { Transporter } from 'nodemailer';
import { IMailTemplate } from '../MailTemplate/IMailTemplateDTO';
import { IMailProvider } from './IMailProvider';
import { ISendEmail } from './ISendMailDTO';

class EtherealMailProvider implements IMailProvider {
  private client!: Transporter;
  private mailTemplateProvider: IMailTemplate;

  constructor(mailTemplateProvider: IMailTemplate) {
    this.mailTemplateProvider = mailTemplateProvider;

    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.client = transporter;
    });
  }

  public async sendMail({
    to,
    subject,
    templateData,
    from,
  }: ISendEmail): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe ProShop',
        address: from?.email || 'equipe@proshop.com',
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
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default EtherealMailProvider;
