import { Metadata } from 'next'
import Veronika from './Veronika'

export const metadata: Metadata = {
  title: 'Вероника | Архитектура',
}

export default function VeronikaPage() {
  return (
    <div className="flex justify-center">
      <Veronika />
    </div>
  )
}
