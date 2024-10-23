import { axiosWithAuth } from '@/api/interceptors'
import { ITasksResponse } from '@/types/tasks.types'

const tasksService = {
  async getTasks(): Promise<ITasksResponse> {
    const response = await axiosWithAuth.get<ITasksResponse>('/tasks/')
    console.log(response.data)

    return response.data
  },
}

export default tasksService
