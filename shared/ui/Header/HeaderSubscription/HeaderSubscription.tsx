'use client'

import React, { FC, useEffect, useRef, useState } from 'react'

import { HeaderSubscriptionProps } from './HeaderSubscription.types'

const getDaysLeft = (start: string, end: string): number => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const diffTime = endDate.getTime() - startDate.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

const getDayWord = (days: number): string => {
    const absDays = Math.abs(days)
    if (absDays % 10 === 1 && absDays % 100 !== 11) return 'день'
    if ([2, 3, 4].includes(absDays % 10) && ![12, 13, 14].includes(absDays % 100)) return 'дня'
    return 'дней'
}

export const HeaderSubscription: FC<HeaderSubscriptionProps> = () => {
    const [daysLeft, setDaysLeft] = useState<number | null>(null)
    const [isActive, setIsActive] = useState(false)
    const prevMeRef = useRef<string | null>(null)

    const updateDaysLeft = () => {
        const meRaw = localStorage.getItem('me')
        if (meRaw) {
            try {
                const me = JSON.parse(meRaw)
                const { end_at, is_active } = me.subscription || {}
                if (is_active) {
                    setIsActive(is_active)
                    if (end_at) {
                        const difference = getDaysLeft(new Date().toISOString(), end_at)
                        setDaysLeft(difference > 0 ? difference : 0)
                    } else {
                        setDaysLeft(0)
                    }
                } else {
                    setIsActive(false)
                }
            } catch (error) {
                console.error('Ошибка парсинга JSON-обьект "me":', error)
                setDaysLeft(0)
            }
        } else {
            setDaysLeft(0)
        }
    }

    useEffect(() => {
        updateDaysLeft()

        const intervalId = setInterval(() => {
            const meRaw = localStorage.getItem('me')
            if (meRaw !== prevMeRef.current) {
                prevMeRef.current = meRaw
                updateDaysLeft()
            }
        }, 1000)

        return () => clearInterval(intervalId)
    }, [])

    const active = isActive && daysLeft !== null && daysLeft > 0

    return (
        <>
            <div
                className={`max-w-40 py-2 px-4 rounded-2xl ${active ? 'bg-[#FDB933]' : 'bg-[#262833]'}`}
            >
                {active ? (
                    <div className="flex flex-col">
                        <p className="text-black font-bold text-xs">Подписка активна</p>
                        <p className="text-black font-medium text-xs">
                            {daysLeft} {getDayWord(daysLeft!)} до окончания
                        </p>
                    </div>
                ) : (
                    <p className="text-gray-100 font-bold text-xs">
                        Подписка <br /> не подключена
                    </p>
                )}
            </div>
        </>
    )
}
