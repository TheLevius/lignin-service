interface FormData {
	email: string;
	phone: string;
	name: string;
	message: string;
}

interface ValidationResult {
	isValid: boolean;
	errorMessage?: string;
}

export default {
	validateForm(data: FormData): ValidationResult {
		const fields = ['email', 'phone', 'name', 'message'];
		const emptyFields = fields.filter((field) => !data[field]);

		if (emptyFields.length > 0) {
			return {
				isValid: false,
				errorMessage: `Поля: ${emptyFields.join(', ')} не должны быть пустыми`,
			};
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(data.email)) {
			return {
				isValid: false,
				errorMessage: 'Неверный формат email',
			};
		}

		const phoneRegex = /^(?:\+7|8)\d{10}$/;
		if (!phoneRegex.test(data.phone)) {
			return {
				isValid: false,
				errorMessage:
					'Неверный формат телефона. Используйте +7XXXXXXXXXX или 8XXXXXXXXXX (11 цифр)',
			};
		}

		const nameSpaceCount = data.name.match(/ /g)?.length ?? 0;
		if (nameSpaceCount > 2) {
			return {
				isValid: false,
				errorMessage: 'Имя не может содержать больше двух пробелов',
			};
		}

		const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\-\'\s]+$/;
		if (!nameRegex.test(data.name)) {
			return {
				isValid: false,
				errorMessage: 'Имя содержит недопустимые символы',
			};
		}

		if (data.message.length < 5 || data.message.length > 1000) {
			return {
				isValid: false,
				errorMessage:
					'Сообщение не может содержать меньше 5 или больше 1000 символов',
			};
		}

		return { isValid: true };
	},
};
