import { Metadata } from 'next'
import CheckListForm from './CheckListForm'
import sendMessage from '@/services/telegram.service'
import createSpreadsheet from '@/services/google-sheet.service'
import type { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

export const metadata: Metadata = {
  title: 'Заполнение чек-листа | Архитектура',
}

interface IProps {
  params: Params
}

export default function ({ params }: IProps) {
  const id = params.slug

  return (
    <div className="flex justify-center h-full">
      <CheckListForm
        id={id}
        createSpreadsheet={createSpreadsheet}
        sendMessage={sendMessage}
      />
    </div>
  )
}
