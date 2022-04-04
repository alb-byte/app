import nodemailer from 'nodemailer';
import config from '../config';
export default nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: { user: config.mail.user, pass: config.mail.password },
});
