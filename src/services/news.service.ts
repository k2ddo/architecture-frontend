import { axiosWithAuth } from '@/api/interceptors'
import { INewsResponse } from '@/types/news.types'

const newsService = {
  async getNews(): Promise<INewsResponse[]> {
    const response = await axiosWithAuth.get<INewsResponse[]>('/news/')

    return response.data
  },
}

export default newsService
