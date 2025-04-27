const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.MAILER_HOST || 'smtp.gmail.com',
  port: process.env.MAILER_PORT || 587,
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS
  }
});

// Función para enviar correo
const sendMail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"SCHNELL - Plataforma de Cotizaciones" <${process.env.MAILER_USER}>`,
      to,
      subject,
      html,
    });

    console.log('📧 Email enviado:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Error enviando email:', error);
    throw error;
  }
};

module.exports = { sendMail };
