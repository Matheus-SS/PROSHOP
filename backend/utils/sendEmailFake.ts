import nodemailer from 'nodemailer';
import { parse, IParseMailTemplateDTO } from './handlebarsMailTemplate';
interface IMailContact {
  name: string;
  email: string;
}

interface ISendEmail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}

export const sendMailFake = ({
  to,
  from,
  subject,
  templateData,
}: ISendEmail) => {
  return new Promise<boolean>((resolve, reject) => {
    nodemailer.createTestAccount().then(async (account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      transporter.sendMail(
        {
          from: {
            name: from?.name || 'Equipe ProShop',
            address: from?.email || 'equipe@proshop.com',
          },
          to: {
            name: to.name,
            address: to.email,
          },
          subject: subject,
          html: await parse(templateData),
        },
        (err, info) => {
          console.log('Message sent', info.messageId);

          // Preview only available when sending through an Ethereal account
          console.log('Preview URL', nodemailer.getTestMessageUrl(info));
          resolve(true);
        }
      );
    });
  });
};
