import Link from 'next/link'
import Title from '@/components/ui/Title'
import { useQuery } from '@tanstack/react-query'
import DASHBOARD_PAGES from '@/config/pages-url.config'
import { checkListsService } from '@/services/check-lists.service'

interface IProps {
  name: string
  type: 'check_list' | 'estimate'
}

export default function CheckListItem({ name, type }: IProps) {
  const { data } = useQuery({
    queryKey: [type],
    queryFn: () => checkListsService.getCheckListNames(type),
  })

  return (
    <div>
      <Title title={name} />
      <div className="grid grid-cols-1 md:grid-cols-2 w-full mt-5">
        {data?.map((checkList) => (
          <div
            key={checkList.id}
            className="bg-[rgb(255,255,255,0.2)] odd:mr-2.5 mb-5 even:ml-2.5 rounded-[20px] hover:scale-110 transition-transform ease-in-out text-center shadow-glow-dark"
          >
            <Link
              href={DASHBOARD_PAGES.CHECK_LIST.replace(
                '%id%',
                checkList.id.toString()
              )}
            >
              <div className="py-5 text-white text-[15px]">
                {checkList.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
