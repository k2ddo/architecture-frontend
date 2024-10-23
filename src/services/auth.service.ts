import {
  IAuthLogin,
  IAuthLoginResponse,
  IAuthRegister,
  IAuthRegisterResponse,
} from '@/types/auth.types'

import { axiosClassic, axiosWithAuth } from '@/api/interceptors'

import tokenService from './auth-token.service'

const authService = {
  async login(data: IAuthLogin) {
    const response = await axiosClassic.post<IAuthLoginResponse>(
      '/auth/token/login/',
      data
    )
    if (response.data.auth_token)
      tokenService.saveToken(response.data.auth_token)

    return response.data
  },

  async register(data: IAuthRegister) {
    const response = await axiosClassic.post<IAuthRegisterResponse>(
      '/auth/users/',
      data
    )

    return response.data
  },

  async checkApproval() {
    try {
      const response =
        await axiosWithAuth.get<IAuthRegisterResponse>('/auth/users/me/')

      return response.data
    } catch (error: any) {
      return error?.response?.data
    }
  },

  async logout() {
    const response = await axiosWithAuth.post<boolean>('/auth/token/logout/')

    if (response.data) tokenService.removeToken()

    return response.data
  },
}

export default authService
