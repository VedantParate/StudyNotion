const nodemailer = require("nodemailer");

const mailSender = async (email, subject, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"StudyNotion" <${process.env.MAIL_USER}>`,
      to: email,
      subject,
      html: body,
    });

    return info;
  } catch (error) {
    console.error("Mail sending error:", error);
    throw error;
  }
};

module.exports = mailSender;