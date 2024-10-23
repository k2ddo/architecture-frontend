import { Metadata } from 'next'
import WaitingBlock from './Waiting'

export const metadata: Metadata = {
	title: 'Ожидание | Demer',
}

export default function WaitingPage() {
	return (
		<div className='flex justify-center items-center h-screen'>
			<WaitingBlock />
		</div>
	)
}
