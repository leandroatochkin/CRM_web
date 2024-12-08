const nodemailer = require('nodemailer');

const sendEmailNotification =  async (user) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.MALBEC_EMAIL,
        pass: process.env.MALBEC_EMAIL_PASS,
      },
    });
  
    
  
    // Only build mailOptionsToBusiness if it's a business notification

  
      passwordReset = {
        from: process.env.PENDING,
        to: process.env.PENDING,
        subject: 'Nueva solicitud de blanqueo',
        text: `El usuario ${user.name}, leg. nro. ${user.file_name}, id ${user.id} ha solicitado un blanqueo de contraseña.`,
      };
    

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  
}
  
  module.exports = {sendEmailNotification};
  