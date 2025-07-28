'use client'

import Header from '@/shared/ui/Header'
import Sidebar from '@/shared/ui/Sidebar'
import MobileSidebar from '@/shared/ui/Sidebar/MobileSidebar'
import React, { useEffect, useState } from 'react'

export const TelegramLayout = ({ children }: { children: React.ReactNode }) => {
    const [isTelegramWebApp, setIsTelegramWebApp] = useState(false)

    useEffect(() => {
        // @ts-ignore
        const tg = typeof window !== 'undefined' && window.Telegram?.WebApp
        if (tg && tg.initData && tg.isExpanded !== undefined && !tg.isFullscreen) {
            setIsTelegramWebApp(true)
        }
    }, [])

    return (
        <div
            className={isTelegramWebApp ? 'flex flex-col gap-11 pt-28 pb-4' : 'flex flex-col gap-8'}
        >
            <Header />
            <Sidebar />
            <MobileSidebar />
            {children}
        </div>
    )
}
