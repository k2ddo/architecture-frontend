'use client'

import Title from '@/components/ui/Title'
import Task from '@/components/ui/Task'
import { useQuery } from '@tanstack/react-query'
import tasksService from '@/services/tasks.service'

export default function Tasks() {
  const { data } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => tasksService.getTasks(),
  })

  return (
    <div className="w-3/4">
      {data?.today.length ? <Title title="Задачи на сегодня" /> : <div></div>}
      {data?.today?.map((task) => <Task task={task} />)}
      {data?.tomorrow.length ? <Title title="Задачи на завтра" /> : <div></div>}
      {data?.tomorrow?.map((task) => <Task task={task} />)}
    </div>
  )
}
