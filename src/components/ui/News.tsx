'use client'

import newsService from '@/services/news.service'
import { useQuery } from '@tanstack/react-query'
import NewsFiles from './news/NewsFiles'
import NewsMedia from './news/NewsMedia'
import NewsText from './news/NewsText'
import NewsTitle from './news/NewsTitle'
import NewsUrls from './news/NewsUrls'
import Title from './Title'

export default function News() {
  const { data } = useQuery({
    queryKey: ['news'],
    queryFn: () => newsService.getNews(),
  })

  return (
    <div className="w-3/4">
      <Title title="Последние новости" />
      <div>
        {data?.map((item, index) => (
          <div
            key={index}
            className="bg-[rgba(255,255,255,0.2)] rounded-[20px] w-full mt-5 shadow-glow-dark"
          >
            <div className="p-6 text-[15px]">
              <NewsTitle title={item.title} />
              <NewsMedia media={item.media || []} />
              <NewsText text={item.text || ''} />
              <NewsFiles media={item.media || []} />
              <NewsUrls urls={item.urls || []} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
