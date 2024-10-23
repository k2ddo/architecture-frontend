import { Telegraf } from 'telegraf'

async function sendMessage(
	filename: string,
	title: string,
	url: string,
	answersTime: string[]
) {
	'use server'
	const bot = new Telegraf(process.env.NEXT_PUBLIC_TELEGRAM_TOKEN || '')

	const time = answersTime
		.map((time, index) => `Вопрос ${index + 1}: ${time}`)
		.join('\n')
	const text = `${filename} создан: ${title}\n\nСсылка: ${url} \n\n${time}`

	bot.telegram.sendMessage(process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || '', text)
}

export default sendMessage
