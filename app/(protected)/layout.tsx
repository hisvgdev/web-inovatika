import { getMe } from '@/utils/api/users.api'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

import ClientWrapper from './ClientWrapper'

interface ProtectedLayoutProps {
    children: ReactNode
}

export default async function ProtectedLayout({ children }: ProtectedLayoutProps) {
    const cookieStore = await cookies()
    const headersList = await headers()
    const token = cookieStore.get('access_token')
    const userAgent = headersList.get('user-agent') || ''
    const isFromTelegram = userAgent.toLowerCase().includes('telegram')

    if (isFromTelegram) {
        redirect('/account')
    }

    if (!token) {
        redirect('/auth/login')
    }

    const me = await getMe()

    return <ClientWrapper me={me}>{children}</ClientWrapper>
}
