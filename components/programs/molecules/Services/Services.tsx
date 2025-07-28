'use client'

import aiIcon from '@/public/assets/icons/AIZKHIcon.png'
import checkOfAgent from '@/public/assets/icons/checkOfAgent.png'
import { getCurrentPlanFromStorage } from '@/utils/helpers/getCurrentIdPlanFromStorage'
import React, { FC, useEffect, useState } from 'react'

import ServiceCard from '../../atoms/ServiceCard'
import { ServicesProps } from './Services.types'

export const Services: FC<ServicesProps> = (props) => {
    const {} = props
    const [hasSubs, setHasSubs] = useState(false)

    useEffect(() => {
        const getSubs = getCurrentPlanFromStorage()
        setHasSubs(!!getSubs?.is_active)
    }, [])

    return (
        <div className="flex flex-col gap-y-5 w-full">
            <h1 className="text-black font-bold text-xl dark:text-white">Услуги сервиса</h1>
            <div className="flex flex-col gap-y-1.5">
                <ServiceCard
                    icon={checkOfAgent}
                    title="Проверка контрагентов"
                    description="Этот сервис позволит получить вам актуальную справку с информацией о контрагенте"
                    href="/programs/check-conter-agent"
                    disabled={!hasSubs}
                />
                <ServiceCard
                    icon={aiIcon}
                    title="Искусственный интеллект ЖКХ"
                    description="Интеллектуальный помощник на базе современных версий нейросетей"
                    href="/programs/ai-chats"
                    disabled={!hasSubs}
                />
            </div>
        </div>
    )
}
