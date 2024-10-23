import { INewsUrl } from '@/types/news.types'
import Link from 'next/link'

interface IProps {
	urls: INewsUrl[]
}

export default function NewsUrls({ urls }: IProps) {
	return (
		urls &&
		urls.map((url, index) => (
			<div key={index} className='bg-slate-300 mt-3 rounded-lg'>
				<Link href={url.url}>
					<div className='p-2.5 text-center'>{url.title}</div>
				</Link>
			</div>
		))
	)
}
