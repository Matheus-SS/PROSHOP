interface IMailConfig {
  driver: 'ethereal' | 'sendgrid';
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
} as IMailConfig;
