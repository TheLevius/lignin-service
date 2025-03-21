export default {
	routes: [
		{
			method: 'GET',
			path: '/articles/path/:path',
			handler: 'api::article.article.findByPath',
			config: {
				auth: false,
			},
		},
	],
};
