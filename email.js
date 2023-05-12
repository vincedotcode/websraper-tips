const sgMail = require('@sendgrid/mail');


sgMail.setApiKey('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');

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
