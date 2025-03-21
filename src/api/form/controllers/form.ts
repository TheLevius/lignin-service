'use strict';

module.exports = {
	async feedback(ctx) {
		try {
			const formData = ctx.request.body;

			// Валидация данных формы
			const validation =
				await strapi.services['api::form.validation'].validateForm(formData);
			if (!validation.isValid) {
				return ctx.badRequest(validation.errorMessage);
			}

			// Отправка письма на почту (если раскомментировано)
			// await strapi.plugins['email'].services.email.send({...});

			// Отправка уведомления в Telegram
			try {
				await strapi.services['api::form.telegram'].sendNotification(formData);
			} catch (notificationError) {
				console.error('Error sending notification:', notificationError);
				return ctx.badRequest('Ошибка при отправке уведомления', {
					error: notificationError.message,
				});
			}
			// try {
			// 	await strapi.services['api::form.whatsapp'].sendMessage(formData);
			// } catch (messageError) {
			// 	console.error('Error sending notification:', messageError);
			// 	return ctx.badRequest('Ошибка при отправке сообщения whatsapp: ', {
			// 		error: messageError.message,
			// 	});
			// }

			return ctx.send({
				message: `Форма успешно отправлена! ${new Date().toLocaleTimeString('ru-RU')}`,
				data: formData,
			});
		} catch (error) {
			return ctx.badRequest('Ошибка при отправке формы', {
				error: error.message,
			});
		}
	},
};
