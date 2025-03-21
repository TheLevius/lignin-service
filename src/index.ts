import type { Core } from '@strapi/strapi';
// import whatsappService from './api/form/services/whatsapp';
export default {
	/**
	 * An asynchronous register function that runs before
	 * your application is initialized.
	 *
	 * This gives you an opportunity to extend code.
	 */
	async register(/* { strapi }: { strapi: Core.Strapi } */) {},

	/**
	 * An asynchronous bootstrap function that runs before
	 * your application gets started.
	 *
	 * This gives you an opportunity to set up your data model,
	 * run jobs, or perform some special logic.
	 */
	async bootstrap({ strapi }: { strapi: Core.Strapi }) {
		// try {
		// 	await whatsappService.initialize();
		// 	strapi.log.info('WhatsApp клиент успешно инициализирован');
		// } catch (error) {
		// 	strapi.log.error('Не удалось инициализировать WhatsApp клиент:', error);
		// }
	},
};
