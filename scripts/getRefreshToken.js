import { google } from 'googleapis';
import 'dotenv/config';

const CLIENT_ID = process.env.SMTP_CLIENT_ID;
const CLIENT_SECRET = process.env.SMTP_CLIENT_SECRET;
const REDIRECT_URI = process.env.SMTP_REDIRECT_URI;
const CODE = process.env.SMTP_CODE;

const oAuth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URI
);

async function getToken() {
	const { tokens } = await oAuth2Client.getToken(CODE);
	console.log('SMTP_REFRESH_TOKEN:', tokens.refresh_token);
}

getToken();
