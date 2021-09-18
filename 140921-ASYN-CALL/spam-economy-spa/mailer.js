const nodemailer = require('nodemailer');

const enviar = (to, subject, text) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yerkodigotest@gmail.com',
      pass: 'Test123321.',
    },
  })

  let mailOptions = {
    from: 'yerkodigotest@gmail.com',
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    err ? console.log(err) : console.log(data);
  })
}

module.exports = enviar;
