import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';

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
const transporter = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY || 'default',
  })
);

export const sendMailReal = async ({
  to,
  from,
  subject,
  templateData,
}: ISendEmail): Promise<void> => {
  await transporter.sendMail({
    from: {
      name: from?.name || 'Equipe ProShop',
      address: from?.email || 'froste43@gmail.com',
    },
    to: {
      name: to.name,
      address: to.email,
    },
    subject: subject,
    html: await parse(templateData),
  });
};
