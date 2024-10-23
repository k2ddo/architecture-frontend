'use client'

import DASHBOARD_PAGES from '@/config/pages-url.config'
import tokenService from '@/services/auth-token.service'
import authService from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Title from '@/components/ui/Title'

export default function Profile() {
  const { replace } = useRouter()

  const { mutate, isPending } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess() {
      tokenService.removeToken()
      replace(DASHBOARD_PAGES.AUTHENTICATION)
    },
  })

  return (
    <div className="w-3/4">
      <Title title="Личный кабинет" />
      <div className="my-7 text-white text-[20px] w-fit">
        <div>В разработке</div>
        <button
          onClick={(e) => mutate()}
          disabled={isPending}
          className="bg-orange hover:bg-orange-dark mt-4 rounded-[20px] w-full transition-colors delay-250 ease-in-out"
        >
          <div className="mx-4 my-3 text-white">
            {isPending ? 'Загрузка...' : 'Выйти из аккаунта'}
          </div>
        </button>
      </div>
    </div>
  )
}
