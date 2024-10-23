'use client'

import parse from 'html-react-parser'
import { ScAddr } from 'ts-sc-client'
import Title from '@/components/ui/Title'
import { useChat } from '@/hooks/useChat'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useCallback, useEffect, useState } from 'react'
import { resolveUserAgent } from '@/api/sc/agents/resolveUserAgent'

interface Inputs {
  message_text: string
}

export default function Veronika() {
  const [user, setUser] = useState<ScAddr | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    initChat,
    sendMessage,
    isAgentAnswer,
    onFetching,
    messages,
    chatRef,
  } = useChat(user)

  const onSend = useCallback(
    async (text: string, setMessage: boolean = true) => {
      if (!user) return
      await sendMessage(user, text, setMessage)
    },
    [user, sendMessage]
  )

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const user = await resolveUserAgent()
      if (!user) return
      setUser(user)
      await initChat([user])
      setIsLoading(false)
    })()
  }, [initChat])

  const { register, handleSubmit, reset } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    onSend(data.message_text)
    reset()
  }

  return (
    <div className="w-3/4">
      <Title title="Вероника" />
      <div className="mb-24">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`rounded-[20px] w-fit max-w-md ${!!user && message.author.equal(user) ? 'ml-auto bg-[rgba(255,255,255,0.2)]' : 'bg-orange-dark'} `}
          >
            <div className="py-3 px-4 my-3">
              <div className="text-white">{parse(message.text)}</div>
              <div className="text-slate-300 flex justify-end text-[13px]">
                {message.time}
              </div>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fixed bottom-0 left-0 flex justify-center w-full"
      >
        <div className="bg-white w-3/4 flex justify-between p-3 rounded-t-[20px] shadow-glow">
          <input
            type="text"
            placeholder="Сообщение..."
            {...register('message_text', { required: true })}
            className="w-full bg-transparent placeholder:text-slate-400 outline-none ml-3"
          />
          <button
            type="submit"
            disabled={isAgentAnswer}
            className={`text-white hover:bg-orange-dark transition-colors rounded-[7px] ${isAgentAnswer ? 'animate-bounce bg-orange-dark' : 'bg-orange'}`}
          >
            <div className="p-2">
              {isAgentAnswer ? 'Ожидание' : 'Отправить'}
            </div>
          </button>
        </div>
      </form>
    </div>
  )
}
