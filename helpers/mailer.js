const nodemailer = require('nodemailer');

export default (config) => {
  const smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: config.from,
      pass: config.pass,
    },
  });
  const mailOptions = {
    from: config.from,
    to: config.to,
    cc: config.cc,
    bcc: config.bcc,
    subject: config.subject,
    text: config.text,
    html: config.html,
    attachments: config.attachments.map((data) => ({
      filename: data.originalname,
      content: data.buffer,
      contentType: data.mimetype,
    })),
  };
  return new Promise((resolve, reject) => {
    smtpTransport.sendMail(mailOptions, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};
