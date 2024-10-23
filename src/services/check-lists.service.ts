import { axiosWithAuth } from '@/api/interceptors'
import { ICheckListQuestions } from '@/types/check-list.types'

export enum EnumTypes {
  'CHECK_LIST' = 'check_list',
  'ESTIMATE' = 'estimate',
}

export const checkListsService = {
  async getCheckListNames(
    type: 'check_list' | 'estimate'
  ): Promise<Array<{ id: number; name: string }>> {
    const response = await axiosWithAuth.get(`/check-lists/?type=${type}`)

    return response.data
  },

  async getCheckListQuestions(id: number): Promise<ICheckListQuestions> {
    const response = await axiosWithAuth.get(`/check-lists/${id}/`)

    return response.data
  },
}
