import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import mailTransport from '../libs/nodemailer';
import config from '../libs/config';

export const sendMail = async (email: string, fullName: string, token: string): Promise<void> => {
  const filePath = path.join(__dirname, '../views/verifyEmail.hbs');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = {
    fullName,
    token,
  };
  const htmlToSend = template(replacements);

  const mailOptions = {
    from: config.mail.from,
    to: email,
    subject: 'Account Verification Code',
    html: htmlToSend,
  };
  console.log(token);
  await mailTransport.sendMail(mailOptions);
};
