'use strict';

module.exports = {
	async feedback(ctx) {
		try {
			const body = ctx.request.body;
			const fields = ['email', 'phone', 'name', 'message'];
			const emptyFields = fields.filter((field) => !body[field]);
			if (emptyFields.length > 0) {
				ctx.badRequest(`Поля: ${emptyFields.join(', ')}не должны быть пустыми`);
			}
			const { email, phone, name, message } = body;

			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				return ctx.badRequest('Неверный формат email');
			}
			const phoneRegex = /^(?:\+7|8)\d{10}$/;
			if (!phoneRegex.test(phone)) {
				return ctx.badRequest(
					'Неверный формат телефона. Используйте +7XXXXXXXXXX или 8XXXXXXXXXX (11 цифр)'
				);
			}

			const nameSpaceCount = name.match(/ /g)?.length ?? 0;
			if (nameSpaceCount > 2) {
				return ctx.badRequest('Имя не может содержать больше двух пробелов');
			}
			const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\-\'\s]+$/;
			if (!nameRegex.test(name)) {
				return ctx.badRequest('Имя содержит недопустимые символы');
			}

			if (message.length < 5 || message.length > 1000) {
				return ctx.badRequest(
					'Сообщение не может содержать меньше 5 или больше 1000 символов'
				);
			}

			await strapi.plugins['email'].services.email.send({
				to: process.env.SMTP_RECIPIENT_EMAIL,
				from: 'ligninsorbent@gmail.com',
				subject: `Новое сообщение от ${name}`,
				text: `
          Email: ${email}
          Телефон: ${phone}
          Имя: ${name}
          
          Сообщение: ${message}
        `,
				html: `
          <h1>Внимание! Говорит Лигнин-сорбент!</h1>
          <p><strong>Телефон:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Имя:</strong> ${name}</p>
          <h1 style="font-size: 100px"><strong>Сообщение:</strong> ${message}</h1>
        `,
			});
			return ctx.send({
				message: 'Форма успешно отправлена!',
			});
		} catch (error) {
			return ctx.badRequest('Ошибка при отправке формы', {
				error: error.message,
			});
		}
	},
};
