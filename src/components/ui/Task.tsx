import { ITask } from '@/types/tasks.types'

interface IProps {
  task: ITask
}

export default function Task({ task }: IProps) {
  return (
    <div className="bg-[rgba(255,255,255,0.2)] shadow-glow-dark rounded-[20px] text-white mt-5 hover:scale-105 transition-transform duration-300">
      <div className="mx-8 py-5">
        <div className="flex justify-between">
          <h3 className="text-[20px] font-semibold">{task.title}</h3>
          <div className="text-[15px]">{task.duration}</div>
        </div>
        <div className="text-[15px] mt-2">{task.description}</div>
      </div>
    </div>
  )
}
