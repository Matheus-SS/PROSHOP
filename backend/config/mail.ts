interface IMailConfig {
  driver: 'ethereal' | 'sendinblue';
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
} as IMailConfig;
