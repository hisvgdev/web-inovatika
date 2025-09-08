'use client'

import { getMe } from '@/utils/api/users.api'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

interface ClientWrapperProps {
    children: React.ReactNode
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
    // useEffect(() => {
    //     // Telegram WebApp настройки
    //     // @ts-ignore
    //     if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    //         // @ts-ignore
    //         const tg = window.Telegram.WebApp

    //         if (typeof tg.requestFullscreen === 'function') {
    //             try {
    //                 tg.requestFullscreen()
    //             } catch (err) {
    //                 console.warn('Fullscreen not supported:', err)
    //             }
    //         }

    //         if (typeof tg.lockOrientation === 'function') {
    //             try {
    //                 tg.lockOrientation('landscape')
    //             } catch (err) {
    //                 console.warn('Orientation lock not supported:', err)
    //             }
    //         }
    //     }
    // }, [])

    const { data, isSuccess } = useQuery({
        queryKey: ['get-me'],
        queryFn: async () => await getMe(),
        refetchInterval: 5000,
        refetchIntervalInBackground: true,
        staleTime: 0,
    })

    useEffect(() => {
        if (isSuccess) {
            localStorage.setItem('me', JSON.stringify(data))
        }
    }, [isSuccess])

    return <div className="h-full flex items-center justify-center w-full">{children}</div>
}
