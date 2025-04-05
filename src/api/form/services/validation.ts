type FormData = {
	email: string;
	phone: string;
	name: string;
	message: string;
};

export type ValidationResult = {
	errors: ErrorMessages;
	errorFields: string[];
};
type ErrorMessages = {
	email: string;
	phone: string;
	name: string;
	message: string;
};

export default {
	validateForm(data: FormData): ValidationResult {
		const errorFields = [];
		const errors: ErrorMessages = {
			email: '',
			phone: '',
			name: '',
			message: '',
		};
		const fields = Object.keys(data);
		for (const field of fields) {
			if (!data[field].length) {
				errorFields.push(field);
				errors[field] = 'Поле не может быть пустым';
			}
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!errorFields.includes('email') && !emailRegex.test(data.email)) {
			errorFields.push('email');
			errors.email = 'Неверный формат email';
		}

		const phoneRegex = /^\+\d{6,14}$/;
		if (!errorFields.includes('phone') && !phoneRegex.test(data.phone)) {
			errorFields.push('phone');
			errors.phone =
				'Неверный формат телефона. Должен начинаться с + и содержать от 6 до 14 цифр';
		}

		const nameSpaceCount = data.name.match(/ /g)?.length ?? 0;

		if (!errorFields.includes('name') && nameSpaceCount > 2) {
			errorFields.push('name');
			errors.name = 'Имя не может содержать больше двух пробелов';
		}

		const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\-\'\s]+$/;
		if (!errorFields.includes('name') && !nameRegex.test(data.name)) {
			errorFields.push('name');
			errors.name = 'Имя содержит недопустимые символы';
		}

		if (
			(!errorFields.includes('message') && data.message.length < 5) ||
			data.message.length > 1000
		) {
			errorFields.push('message');
			errors.message =
				'Сообщение не может содержать меньше 5 или больше 1000 символов';
		}

		return {
			errors,
			errorFields,
		};
	},
};
