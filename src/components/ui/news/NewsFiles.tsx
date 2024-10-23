import { INewsMedia } from '@/types/news.types'

interface IProps {
	media: INewsMedia[]
}

export default function NewsFiles({ media }: IProps) {
	const files = media?.filter(mediaItem => mediaItem.media_type === 'file')

	return files.map((mediaItem, index) => (
		<div key={index} className='bg-slate-300 mt-3 rounded-lg'>
			<a
				href={mediaItem.media}
				download
				target='_blank'
				rel='noopener noreferrer'
			>
				<div className='p-2.5 text-center'>{`Скачать ${decodeURIComponent(mediaItem.media.split('/').pop() || '')}`}</div>
			</a>
		</div>
	))
}
