'use client'
import '@/app/globals.css'

interface IProps {
  title: string
}

export default function Title({ title }: IProps) {
  return (
    <div>
      <div className="border-b-4 border-orange w-fit mt-8">
        <h1 className="text-white font-bold text-[28px] text-shadow-glow">
          {title}
        </h1>
      </div>
    </div>
  )
}
