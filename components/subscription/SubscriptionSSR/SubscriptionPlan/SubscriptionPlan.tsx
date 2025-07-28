'use client'

import { useTheme } from '@/hooks/useTheme'
import clsx from 'clsx'
import { useAtom } from 'jotai'
import React, { FC, useMemo } from 'react'

import { atomSelectedOption } from '@/lib/atom/subscription.atom'

import { SubscriptionPlanProps } from './SubscriptionPlan.types'

type SubscriptionPlan = {
    id: string
    title: string
    price: string
    highlight?: string
    isFree?: boolean
    gradient?: boolean
    isLegal?: boolean
    isTrial?: boolean
}

export const SubscriptionPlan: FC<SubscriptionPlanProps> = (props) => {
    const { tariffs } = props
    const [selectedOption, setSelectedOption] = useAtom(atomSelectedOption)
    const { theme } = useTheme()

    const parseDurationInMonths = (durationStr: string): number => {
        const match = durationStr.match(/^P(\d+)D$/)
        if (!match) return 1
        const days = parseInt(match[1])
        return days / 30
    }

    const tarriffsPlans: SubscriptionPlan[] = useMemo(() => {
        if (!Array.isArray(tariffs)) return []

        const numericTariffs = (
            tariffs as Array<{
                price: string | number
                duration: string
                is_trial: boolean
                is_legal: boolean
                id: string
                name: string
            }>
        ).map((t) => ({
            ...t,
            durationMonths: parseDurationInMonths(t.duration),
            priceValue:
                typeof t.price === 'string' ? parseFloat(t.price.replace(/[₽\s]/g, '')) : t.price,
        }))

        const base =
            numericTariffs.find((t) => t.durationMonths === 1 && !t.is_trial) || numericTariffs[0]
        const basePricePerMonth = base.priceValue / base.durationMonths

        return numericTariffs.map((tariff) => {
            const isTrial = tariff.is_trial
            const months = tariff.durationMonths
            const pricePerMonth = tariff.priceValue / months

            let savingPercent: string | undefined = undefined

            if (!isTrial && basePricePerMonth > 0 && months > 1) {
                const saving = (1 - pricePerMonth / basePricePerMonth) * 100
                savingPercent = `${saving.toFixed(0)}% экономии`
            }

            return {
                id: tariff.id,
                title: tariff.name,
                price: tariff.priceValue === 0 ? 'Получить бесплатно!' : `${tariff.priceValue}₽`,
                isFree: isTrial,
                isLegal: tariff.is_legal,
                isTrial: isTrial,
                gradient: isTrial ? true : undefined,
                highlight: savingPercent,
            }
        })
    }, [tariffs])

    console.log(tarriffsPlans)
    return (
        <div className="flex flex-col gap-y-4">
            <div className="text-center">
                <h1 className="font-bold text-xl text-black dark:text-gray-300">
                    Приобрести подписку
                </h1>
                <p className="text-sm font-normal text-gra-600 dark:text-gray-400">
                    Выберите план подписки
                </p>
            </div>
            <form>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {tarriffsPlans.length > 0 &&
                        tarriffsPlans.map(({ id, price, title, gradient, highlight }) => {
                            const isSelected = selectedOption === id

                            return (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => setSelectedOption(id)}
                                    className={clsx(
                                        'py-9 px-5 rounded-2xl flex items-center justify-between w-full transition-all border cursor-pointer',
                                        isSelected ? 'ring ring-[#FDB933]' : 'border-transparent',
                                        !gradient && 'bg-white dark:bg-[#262833]',
                                    )}
                                    style={
                                        gradient
                                            ? {
                                                  background:
                                                      theme === 'dark'
                                                          ? 'linear-gradient(0deg, rgba(0, 255, 98, 0.25), rgba(0, 255, 98, 0.25))'
                                                          : 'linear-gradient(0deg, rgba(0, 255, 98, 0.2), rgba(0, 255, 98, 0.2))',
                                              }
                                            : undefined
                                    }
                                >
                                    <div className="flex flex-col gap-y-0.5 text-left">
                                        <h4 className="text-black font-bold text-sm dark:text-white ">
                                            {title}
                                        </h4>
                                        <p className="text-black font-medium text-sm dark:text-gray-400">
                                            {price}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-x-5">
                                        {highlight && (
                                            <span className="bg-[#00FF59] py-0.5 px-4 rounded-full text-xs font-semibold">
                                                {highlight}
                                            </span>
                                        )}
                                        <input
                                            type="radio"
                                            name="subscription"
                                            value={id}
                                            checked={isSelected}
                                            onChange={() => setSelectedOption(id)}
                                            className="accent-[#FDB933] w-5 h-5"
                                        />
                                    </div>
                                </button>
                            )
                        })}
                </div>
            </form>
        </div>
    )
}
