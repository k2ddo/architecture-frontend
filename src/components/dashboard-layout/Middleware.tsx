'use client'

import DASHBOARD_PAGES from '@/config/pages-url.config'
import authService from '@/services/auth.service'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Middleware() {
	const { replace } = useRouter()
	const url = usePathname()

	useEffect(() => {
		;(async () => {
			const isAuthPage = url.includes('/auth')
			const isWaitingPage = url.includes('/waiting')

			const data = await authService.checkApproval()
			const isAuthorized = data?.is_approved !== undefined
			const isApproved = data?.is_approved

			if (!isAuthorized && !isAuthPage) {
				replace(DASHBOARD_PAGES.AUTHENTICATION)
				return
			}

			if (isAuthorized && !isApproved && !isWaitingPage) {
				replace(DASHBOARD_PAGES.WAITING)
				return
			}

			if (isAuthorized && (isAuthPage || isWaitingPage)) {
				replace(DASHBOARD_PAGES.HOME)
				return
			}
		})()
	}, [])

	return <div></div>
}
