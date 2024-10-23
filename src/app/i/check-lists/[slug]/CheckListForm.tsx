'use client'

import Link from 'next/link'
import Title from '@/components/ui/Title'
import { useState, ChangeEvent } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { checkListsService } from '@/services/check-lists.service'
import { createSpreadsheetArgs, ICheckList } from '@/types/check-list.types'

interface IProps {
  id: number

  createSpreadsheet: (
    title: string,
    questions: string[],
    answers: boolean[]
  ) => Promise<string>

  sendMessage: (
    filename: string,
    title: string,
    url: string,
    answersTime: string[]
  ) => Promise<void>
}

export default function CheckListForm({
  id,
  createSpreadsheet,
  sendMessage,
}: IProps) {
  const { data } = useQuery({
    queryKey: ['get-check-list-questions'],
    queryFn: () => checkListsService.getCheckListQuestions(id),
  })

  const [link, setLink] = useState<string>('')
  const [answersTime, setAnswersTime] = useState<string[]>(
    new Array(data?.questions.length).fill('---')
  )
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICheckList>()

  const handleAnswerChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setValue(`answers.${index}`, e.target.checked)

    const currentDate = new Date()
    const currentTime = currentDate.toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    const newAnswersTime = [...answersTime]

    newAnswersTime[index] = currentTime
    setAnswersTime(newAnswersTime)
  }

  const onSubmit: SubmitHandler<ICheckList> = (data) => {
    const title = data.title
    const answers = data.answers
    mutate({ title, questions, answers })
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ['create-table'],
    mutationFn: ({ title, questions, answers }: createSpreadsheetArgs) =>
      createSpreadsheet(title, questions, answers),
    onSuccess(link, data) {
      setLink(link)
      sendMessage(name, data.title, link, answersTime)
    },
  })

  if (!data) {
    return <div className="text-white text-[20px] mt-10">Загрузка...</div>
  }

  const name = data?.name
  const questions = data?.questions

  return (
    <div className="w-3/4">
      <Title title={name} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Заголовок"
          {...register('title', { required: 'Заполните заголовок чек-листа' })}
          className="my-4 text-white border-b-4 border-b-orange w-1/2 text-[20px] outline-none bg-transparent"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        {questions?.map((question, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-[rgba(255,255,255,0.2)] rounded-[20px] w-full text-[15px] text-white mt-4"
          >
            <div className="ml-5 my-5">{question}</div>
            <div className="flex items-center mr-5">
              <input
                type="checkbox"
                {...register(`answers.${index}`, {
                  onChange: (e) => handleAnswerChange(e, index),
                })}
                className="w-6 h-6"
              />
            </div>
          </div>
        ))}
        <div className="flex justify-between my-3 w-full">
          {link ? (
            <Link
              href={link}
              className="bg-orange rounded-[20px] text-white text-[15px] mb-10"
            >
              <div className="my-4 mx-6">
                Посмотреть сгенерированную таблицу
              </div>
            </Link>
          ) : (
            <div></div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="bg-orange rounded-[20px] text-white text-[15px] mb-10"
          >
            <div className="my-4 mx-6">
              {isPending ? 'Загрузка' : 'Продолжить'}
            </div>
          </button>
        </div>
      </form>
    </div>
  )
}
