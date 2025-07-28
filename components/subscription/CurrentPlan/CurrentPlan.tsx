'use client'

import { Button } from '@/components/ui/Button/Button'
import { HeaderModalCanceledSubs } from '@/shared/ui/Header/HeaderSubscription/HeaderModalCanceledSubs/HeaderModalCanceledSubs'
import { TariffsProps } from '@/utils/api/types/types.api'
import { getCurrentPlanFromStorage } from '@/utils/helpers/getCurrentIdPlanFromStorage'
import clsx from 'clsx'
import React, { useState } from 'react'

export const CurrentPlan = ({ tariffs }: { tariffs: TariffsProps[] }) => {
    const subscriptions = getCurrentPlanFromStorage()
    const [isOpen, setIsOpen] = useState(false)
    const handleChangeActiveCanceledSubs = () => setIsOpen(!isOpen)

    if (!subscriptions?.is_active) return

    const currentPlan = tariffs.find((t) => t.id === subscriptions.tariff_id)

    return (
        <div className="flex flex-col gap-y-4">
            <div className="text-center">
                <h1 className="font-bold text-xl text-black dark:text-gray-300">Текущий план</h1>
            </div>
            <form>
                <div className="flex items-center justify-center">
                    <button
                        type="button"
                        className={clsx(
                            'py-9 px-5 rounded-2xl max-w-md w-full flex items-center justify-center transition-all bg-white dark:bg-[#262833]',
                        )}
                    >
                        <div className="w-full flex flex-col gap-4">
                            <h4 className="text-black font-bold text-xl dark:text-white">
                                {currentPlan?.name}
                            </h4>
                            <div className="flex flex-col gap-3">
                                <span className="text-black font-bold text-sm dark:text-white">
                                    Дата активации:{' '}
                                    {new Date(subscriptions.start_at).toLocaleDateString('ru-RU', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                                <span className="text-black font-bold text-sm dark:text-white">
                                    Дата окончания:{' '}
                                    {new Date(subscriptions.end_at).toLocaleDateString('ru-RU', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </div>
                            <Button onClick={handleChangeActiveCanceledSubs}>
                                Отменить автопродление подписки?
                            </Button>
                        </div>
                    </button>
                </div>
            </form>
            {isOpen && <HeaderModalCanceledSubs handleClose={handleChangeActiveCanceledSubs} />}
        </div>
    )
}
