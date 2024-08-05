import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from '@models/userModel';

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    let sendHtml;
    if (emailType === 'VERIFY') {
      sendHtml = `
        <p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email
        or copy and paste the link below:<br/>
        ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>`;

      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        }
      });
    } else if (emailType === 'RESET') {
      sendHtml = `
        <p>Click <a href="${process.env.DOMAIN}/forgotpassword?token=${hashedToken}">here</a> to reset your password
        or copy and paste the link below:<br/>
        ${process.env.DOMAIN}/forgotpassword?token=${hashedToken}
        </p>`;

      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        }
      });
    } else {
      throw new Error('Invalid emailType');
    }

    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: 'goat@gmail.com',
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      text: '',
      html: sendHtml,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
