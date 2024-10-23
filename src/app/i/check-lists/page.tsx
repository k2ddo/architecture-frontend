import { Metadata } from 'next'
import CheckLists from './CheckLists'

export const metadata: Metadata = {
  title: 'Выбор чек-листов | Архитектура',
}

export default function CheckListsPage() {
  return (
    <div className="flex justify-center h-full">
      <CheckLists />
    </div>
  )
}
