export interface IAuthLogin {
	username: string
	password: string
}

export interface IAuthRegister {
	first_name: string
	last_name: string
	email: string
	username: string
	password: string
}

export interface IAuthLoginResponse {
	auth_token?: string
	non_field_errors?: string[]
}

export interface IAuthRegisterResponse {
	id?: number
	username?: string
	email?: string
	first_name?: string
	last_name?: string
	password?: string
	is_approved?: boolean
	non_field_errors?: string[]
}

export interface IAuthForm {
	name: string
	type?: string
	placeholder: string
}
