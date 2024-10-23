'use client'

import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { MouseEvent, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'

import Title from '@/components/ui/Title'
import DASHBOARD_PAGES from '@/config/pages-url.config'
import { LOGIN, REGISTER } from '@/data/auth.data'
import authService from '@/services/auth.service'
import type {
  IAuthLogin,
  IAuthLoginResponse,
  IAuthRegister,
  IAuthRegisterResponse,
} from '@/types/auth.types'

export default function AuthForm() {
  const [isLoginPage, setIsLoginPage] = useState<boolean>(true)
  const [authError, setAuthError] = useState<string>('')

  const { replace } = useRouter()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IAuthLogin | IAuthRegister>()

  const changePage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoginPage(!isLoginPage)
    setAuthError('')
    reset()
  }

  const onSuccessRegister = () => {
    setIsLoginPage(!isLoginPage)
    setAuthError('Теперь войдите в аккаунт')
    reset()
  }

  const { mutate, isPending } = useMutation<
    IAuthLoginResponse | IAuthRegisterResponse,
    AxiosError<IAuthLoginResponse & IAuthRegisterResponse>,
    IAuthLogin | IAuthRegister
  >({
    mutationKey: ['auth'],
    mutationFn: (data: IAuthLogin | IAuthRegister) =>
      isLoginPage
        ? authService.login(data as IAuthLogin)
        : authService.register(data as IAuthRegister),
    onSuccess() {
      reset()
      isLoginPage ? replace(DASHBOARD_PAGES.HOME) : onSuccessRegister()
    },
    onError(error) {
      const data = error.response?.data
      setAuthError(
        data?.non_field_errors?.[0] ||
          data?.username?.[0] ||
          data?.password?.[0] ||
          data?.email?.[0] ||
          ''
      )
    },
  })

  const onSubmit: SubmitHandler<IAuthLogin | IAuthRegister> = (data) => {
    mutate(data)
  }

  const formFields = isLoginPage ? LOGIN : REGISTER

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[rgba(255,255,255,0.2)] rounded-[20px] text-white"
    >
      <div className="mx-6 my-8">
        <Title title={isLoginPage ? 'Вход' : 'Регистрация'} />
        {formFields.map(({ name, type, placeholder }) => (
          <div key={name}>
            <div className="bg-[rgba(255,255,255,0.3)] mt-3 rounded-[20px]">
              <input
                type={type || 'text'}
                placeholder={placeholder}
                {...register(name as keyof (IAuthLogin | IAuthRegister), {
                  required: `Введите ${placeholder.toLowerCase()}`,
                })}
                className="bg-transparent mx-3.5 my-4 text-[15px] placeholder:text-slate-300 outline-none"
              />
            </div>
            {errors[name as keyof (IAuthLogin | IAuthRegister)] && (
              <p className="mt-1 text-red-500">
                {errors[name as keyof (IAuthLogin | IAuthRegister)]?.message}
              </p>
            )}
          </div>
        ))}
        <button
          type="submit"
          disabled={isPending}
          className="bg-orange mt-4 rounded-[20px] w-80 transition-colors delay-250 ease-in-out hover:bg-orange-dark"
        >
          <div className="my-2.5 text-[20px] font-bold">
            {isPending
              ? 'Загрузка...'
              : isLoginPage
                ? 'Войти'
                : 'Зарегистрироваться'}
          </div>
        </button>
        {authError ? <p className="mt-1 text-red-500">{authError}</p> : ''}
        <div className="flex justify-center w-full">
          <button
            onClick={changePage}
            className="mt-3 text-white text-[15px] hover:text-slate-300 transition-colors ease-in-out"
          >
            <h3>{isLoginPage ? 'Регистрация' : 'Вход'}</h3>
          </button>
        </div>
      </div>
    </form>
  )
}
