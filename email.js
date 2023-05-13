const SibApiV3Sdk = require('sendinblue-api');

let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

let apiInstance = new SibApiV3Sdk.SMTPApi();

async function sendEmail(data) {
  const { name, email, mobile, message } = data;

  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.to = [{ email: 'betgramorg@gmail.com' }];
  sendSmtpEmail.sender = { email: 'erkadoovince@gmail.com' };
  sendSmtpEmail.subject = 'New Contact Form Submission';
  sendSmtpEmail.textContent = `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}`;

  try {
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = { sendEmail };
