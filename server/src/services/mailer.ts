import { createTransport } from 'nodemailer';

interface Config {
  to: string;
  subject: string;
  html: string;
}

const mailer = ({ to, subject, html }: Config): Promise<void> => {
  // create transporter
  const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS
    }
  });

  // create options for sending email
  const mailOptions = {
    from: {
      name: 'TeamBoard',
      address: process.env.MAILER_USER!
    },
    to,
    subject,
    html
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (e: Error | null) => {
      if (e) {
        reject(e);
      }

      resolve();
    });
  });
};

export default mailer;
