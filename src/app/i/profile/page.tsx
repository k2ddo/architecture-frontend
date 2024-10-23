import { Metadata } from 'next'
import Profile from './Profile'

export const metadata: Metadata = {
  title: 'Профиль | Архитектура',
}

export default function ProfilePage() {
  return (
    <div className="flex justify-center">
      <Profile />
    </div>
  )
}
