const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(data) {
  const { name, email, mobile, message } = data;

  try {
    const mailOptions = {
      to: 'betgramorg@gmail.com',
      from: 'erkadoovince@gmail.com', // Replace this with your own email
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}`,
    };

    const result = await sgMail.send(mailOptions);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
  }
}



module.exports = { sendEmail };
