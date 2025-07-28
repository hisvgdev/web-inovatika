'use client'

import checkSubscriptionIcon from '@/public/assets/icons/checkSubscriptionIcon.svg'
import { BellIcon, CheckIcon, XIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { toast, Toaster } from 'sonner'

export const HasSubsButton = () => {
    const handleCheckHasSubscription = () => {
        const me = localStorage.getItem('me')
        if (me) {
            const parsedMe = JSON.parse(me)
            if (parsedMe.subscription && parsedMe.subscription.is_active) {
                toast.custom((t) => (
                    <div className="bg-[#262833] p-3 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <CheckIcon size={32} color="#FFFFFF" weight="light" />
                            <div>
                                <h1 className="font-manrope text-white font-bold text-sm">
                                    У вас имеется активная подписка
                                </h1>
                                <p className="font-manrope text-white/80 text-xs font-medium">
                                    Вы можете пользоваться рядом наших сервисами которые доступны
                                    для вас
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            } else {
                toast.custom((t) => (
                    <div className="flex flex-col gap-3">
                        <div className="bg-[#262833] p-3 rounded-2xl">
                            <div className="flex items-center gap-4">
                                <BellIcon size={32} color="#FFFFFF" weight="fill" />
                                <div>
                                    <h1 className="font-manrope text-white font-bold text-sm">
                                        У вас нет активной подписки
                                    </h1>
                                    <p className="font-manrope text-white/80 text-xs font-medium">
                                        Приобрести подписку можно перейдя по кнопке ниже
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <Link
                                href="/subscription"
                                className="py-3 px-10 rounded-2xl bg-[#FDB933] font-manrope font-semibold text-xs"
                            >
                                Подключить
                            </Link>
                            <Link
                                type="button"
                                className="flex justify-center cursor-pointer"
                                href="/subscription"
                            >
                                <div className="bg-white rounded-2xl flex items-center gap-2.5 py-3 px-4 hover:opacity-70 dark:bg-[#262833] transition-all">
                                    <Image src={checkSubscriptionIcon} alt="Проверить подписку" />
                                    <span className="font-medium text-xs text-black dark:text-gray-300">
                                        Проверить подписку
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))
            }
        } else {
            toast.custom((t) => (
                <div className="bg-[#262833] p-4 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <XIcon size={32} color="#FFFFFF" weight="light" />
                        <div>
                            <h1 className="font-manrope text-white font-bold text-sm">
                                Произошла тех.ошибка проверки подписки
                            </h1>
                            <p className="font-manrope text-white/80 text-xs font-medium">
                                Обратитесь в тех.поддержку для уточнения вашей проблемы.
                            </p>
                        </div>
                    </div>
                </div>
            ))
        }
    }

    return (
        <>
            <Toaster />
            <button
                type="button"
                className="flex justify-center cursor-pointer mb-4"
                onClick={handleCheckHasSubscription}
            >
                <div className="bg-white rounded-2xl flex items-center gap-x-2.5 p-2.5 hover:opacity-70 dark:bg-[#262833] transition-all">
                    <Image src={checkSubscriptionIcon} alt="Проверить подписку" />
                    <span className="font-medium text-xs text-black dark:text-gray-300">
                        Проверить подписку
                    </span>
                </div>
            </button>
        </>
    )
}
