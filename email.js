var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY; 

var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

async function sendEmail(data) {
  const { name, email, mobile, message } = data;

  let sendSmtpEmail = {
    to: [{ email: 'betgramorg@gmail.com' }],
    sender: { email: 'erkadoovince@gmail.com' },
    subject: 'New Contact Form Submission',
    textContent: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}`,
  };

  try {
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = { sendEmail };
