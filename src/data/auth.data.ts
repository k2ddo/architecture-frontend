import { IAuthForm } from '@/types/auth.types'

export const LOGIN: IAuthForm[] = [
	{ name: 'username', placeholder: 'Никнейм' },
	{ type: 'password', name: 'password', placeholder: 'Пароль' },
]

export const REGISTER: IAuthForm[] = [
	{ name: 'first_name', placeholder: 'Имя' },
	{ name: 'last_name', placeholder: 'Фамилия' },
	{ type: 'email', name: 'email', placeholder: 'Email' },
	{ name: 'username', placeholder: 'Никнейм' },
	{ name: 'password', placeholder: 'Пароль' },
]
