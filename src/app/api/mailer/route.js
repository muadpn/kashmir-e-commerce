import nodemailer from 'nodemailer';
import { google } from 'googleapis';

export default async function POST(req, res) {
  // Replace with your Gmail API credentials
  const clientId = process.env.GOOGLE_MAIL_ID;
  const clientSecret = process.env.GOOGLE_MAIL_SECRET;
  const redirectUri = process.env.VERIFICATION_REDIRECT_URL;

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.send']
  });

  // Redirect the user to the authorization URL
  // On user granting permissions, you'll receive an authorization code

  const authorizationCode = 'RECEIVED_AUTHORIZATION_CODE';

  // Exchange authorization code for access token
  const { tokens } = await oauth2Client.getToken(authorizationCode);
  const accessToken = tokens.access_token;

  // Set up Nodemailer transporter with OAuth2
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'muadpn434@gmail.com',
      clientId: clientId,
      clientSecret: clientSecret,
      refreshToken: tokens.refresh_token,
      accessToken: accessToken
    }
  });

  // Send email
  const mailOptions = {
    from: 'muadpn434@gmail.com',
    to: 'muaddemon434@gmail.com',
    subject: 'Verification Token',
    text: 'Your verification token is: XYZ'
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Email sending failed' });
  }
}