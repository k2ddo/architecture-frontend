import { Metadata } from 'next'
import AuthForm from './AuthForm'

export const metadata: Metadata = {
  title: 'Авторизация | Demer',
}

export default function AuthPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <AuthForm />
    </div>
  )
}
