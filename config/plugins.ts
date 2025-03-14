export default ({ env }) => ({
	email: {
		config: {
			provider: 'nodemailer',
			providerOptions: {
				host: 'smtp.gmail.com',
				port: 587,
				secure: false,
				requireTLS: true,
				ignoreTLS: false,
				auth: {
					type: 'OAuth2',
					user: env('SMTP_USERNAME'),
					clientId: env('SMTP_CLIENT_ID'),
					clientSecret: env('SMTP_CLIENT_SECRET'),
					refreshToken: env('SMTP_REFRESH_TOKEN'),
				},
			},
			settings: {
				defaultFrom: env('SMTP_USERNAME'),
				defaultReplyTo: env('SMTP_USERNAME'),
			},
		},
	},
});
