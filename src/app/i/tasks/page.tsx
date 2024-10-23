import { Metadata } from 'next'
import Tasks from './Tasks'

export const metadata: Metadata = {
  title: 'Задачи | Архитектура',
}

export default function TasksPage() {
  return (
    <div className="flex justify-center h-full">
      <Tasks />
    </div>
  )
}
