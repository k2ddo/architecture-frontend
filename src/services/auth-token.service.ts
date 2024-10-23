const tokenService = {
	getToken() {
		const token = localStorage.getItem('token')
		return token || null
	},

	saveToken(token: string) {
		localStorage.setItem('token', token)
	},

	removeToken() {
		localStorage.removeItem('token')
	},
}

export default tokenService
