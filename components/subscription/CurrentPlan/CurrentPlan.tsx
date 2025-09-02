'use client'

import { HeaderModalCanceledSubs } from '@/shared/ui/Header/HeaderSubscription/HeaderModalCanceledSubs/HeaderModalCanceledSubs'
import { TariffsProps } from '@/utils/api/types/types.api'
import { getMe } from '@/utils/api/users.api'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import React, { useState } from 'react'

export const CurrentPlan = ({ tariffs }: { tariffs: TariffsProps[] }) => {
    const { data } = useQuery({
        queryKey: ['get-me'],
        queryFn: async () => await getMe(),
    })

    const [isOpen, setIsOpen] = useState(false)
    const handleChangeActiveCanceledSubs = () => setIsOpen(!isOpen)

    if (!data?.subscription?.is_active) return

    const currentPlan = tariffs.find((t) => t.id === data.subscription?.tariff_id)

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
                        <div className="w-full flex flex-col gap-3">
                            <h4 className="text-black font-normal text-md dark:text-white">
                                Тип выбранной подписки: <b>{currentPlan?.name}</b>
                            </h4>
                            <div className="flex flex-col gap-3">
                                <span className="text-black font-normal text-md dark:text-white">
                                    Дата активации:{' '}
                                    <b>
                                        {' '}
                                        {new Date(data.subscription.start_at).toLocaleDateString(
                                            'ru-RU',
                                            {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            },
                                        )}
                                    </b>
                                </span>
                                <span className="text-black font-normal text-md dark:text-white">
                                    Дата окончания:{' '}
                                    <b>
                                        {new Date(data.subscription.end_at).toLocaleDateString(
                                            'ru-RU',
                                            {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            },
                                        )}
                                    </b>
                                </span>
                            </div>
                            {!currentPlan?.is_trial && (
                                <button
                                    type="button"
                                    className="font-bold text-[#FDB933] cursor-pointer text-xs"
                                    onClick={handleChangeActiveCanceledSubs}
                                >
                                    Отменить автопродление подписки?
                                </button>
                            )}
                        </div>
                    </button>
                </div>
            </form>
            {isOpen && <HeaderModalCanceledSubs handleClose={handleChangeActiveCanceledSubs} />}
        </div>
    )
}
