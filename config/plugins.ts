export default ({ env }) => ({
	email: {
		config: {
			provider: 'nodemailer',
			providerOptions: {
				host: 'smtp.yandex.ru',
				port: 465,
				secure: true,
				// requireTLS: true,
				// ignoreTLS: false,
				auth: {
					user: env('SMTP_AUTH_USER'),
					pass: env('SMTP_AUTH_PASS'),
				},
			},
			settings: {
				defaultFrom: env('SMTP_AUTH_USER'),
				defaultReplyTo: env('SMTP_AUTH_USER'),
			},
		},
	},
	telegram: {
		config: {
			provider: '',
		},
	},
});
