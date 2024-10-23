export interface ITasksResponse {
  today: ITask[]
  tomorrow: ITask[]
}

export interface ITask {
  title: string
  description: string
  duration: string
}
