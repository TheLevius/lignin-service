/**
 * article controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
	'api::article.article',
	({ strapi }) => ({
		async findByPath(ctx) {
			const { path } = ctx.params;
			const article = await strapi.db.query('api::article.article').findOne({
				where: { path },
				populate: ['cover'],
			});
			if (!article) {
				return ctx.notFound('Article not found');
			}
			const sanitizedArticle = await this.sanitizeOutput(article, ctx);
			return this.transformResponse(sanitizedArticle);
		},
	})
);
