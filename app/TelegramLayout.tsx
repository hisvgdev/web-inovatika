'use client'

import Header from '@/shared/ui/Header'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

const queryClient = new QueryClient()

export const TelegramLayout = ({ children }: { children: React.ReactNode }) => {
    const [isTelegramWebApp, setIsTelegramWebApp] = useState(false)

    useEffect(() => {
        // @ts-ignore
        const tg = typeof window !== 'undefined' && window.Telegram?.WebApp
        if (tg && tg.initData) {
            setIsTelegramWebApp(true)
        }
    }, [])

    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex flex-col gap-4 h-screen w-full">
                <Header />
                <div className="grow flex justify-center items-center w-full">{children}</div>
            </div>
        </QueryClientProvider>
    )
}
