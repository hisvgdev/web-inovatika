'use client'

import { getMe } from '@/utils/api/users.api'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ClientWrapperProps {
    children: React.ReactNode
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
    const router = useRouter()
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

    const { data, error, isSuccess } = useQuery({
        queryKey: ['get-me'],
        queryFn: async () => await getMe(),
        refetchInterval: 5000,
        refetchIntervalInBackground: true,
        staleTime: 0,
    })

    useEffect(() => {
        if (isSuccess && data) {
            localStorage.setItem('me', JSON.stringify(data))
        }
    }, [isSuccess, data])

    useEffect(() => {
        if (error) {
            router.push('/auth/login')
            console.error('Ошибка при получении пользователя:', error)
        }
    }, [error])

    return <div className="h-full flex items-center justify-center w-full">{children}</div>
}
