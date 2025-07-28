'use client'

import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { useTheme } from '@/hooks/useTheme'
import blackArrowRightIcon from '@/public/assets/icons/blackArrowRightIcon.svg'
import Modal from '@/shared/ui/Modal'
import { subscribeToPayment } from '@/utils/api/payments.api'
import { PaymentSubscribePayload, PaymentSubscribeResponse } from '@/utils/api/types/types.api'
import { refreshUser } from '@/utils/api/users.api'
import { getEmailFromStorage } from '@/utils/helpers/getEmailFromStorage'
import { CheckIcon, XIcon } from '@phosphor-icons/react'
import { useAtom, useAtomValue } from 'jotai'
import Image from 'next/image'
import React, { FC, useCallback, useState } from 'react'
import { toast, Toaster } from 'sonner'

import { isModalOpen } from '@/lib/atom/modal.atom'
import { atomSelectedOption } from '@/lib/atom/subscription.atom'

import { PaymentEmailProps } from './PaymentEmail.types'

const isPaymentResponse = (res: unknown): res is PaymentSubscribeResponse => {
    return (
        typeof res === 'object' &&
        res !== null &&
        'payment' in res &&
        typeof (res as any).payment?.confirmation?.confirmation_url === 'string'
    )
}

export const PaymentEmail: FC<PaymentEmailProps> = ({ tariffs = [] }) => {
    const selectedOption = useAtomValue(atomSelectedOption)
    const { theme } = useTheme()
    const [email, setEmail] = useState(() => getEmailFromStorage() ?? '')
    const [promocode, setPromocode] = useState('')
    const [isOpenPromo, setIsOpenPromo] = useAtom(isModalOpen)
    const [loading, setLoading] = useState(false)

    const selectedTariff = tariffs.find((t) => t.id === selectedOption)

    const isEmailValid = (email: string) => /\S+@\S+\.\S+/.test(email)

    const handleChangePromo = () => setIsOpenPromo(!isOpenPromo)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const sendTrialRequest = async (tariffId: string) => {
        try {
            const response = await fetch('/api/trial', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, tariffId }),
            })

            if (!response.ok) {
                toastError('Ошибка при активации пробного периода')
            } else {
                const res = await refreshUser()
                if (res) {
                    localStorage.setItem('me', JSON.stringify(res))
                }
                setTimeout(() => {
                    toastSuccess(
                        'Успешная активация пробной версии',
                        'Теперь вам доступны сервисы с выбранной вами подпиской!',
                    )
                }, 0)
            }
        } catch (error) {
            toastError('Ошибка при активации пробного периода')
        }
    }

    const handleSubmit = useCallback(async () => {
        if (!selectedTariff) {
            return toastError('Выберите корректный тариф')
        }

        if (!isEmailValid(email)) {
            return toastError('Введите корректный e-mail адрес')
        }

        try {
            setLoading(true)

            if (selectedTariff.is_trial) {
                await sendTrialRequest(selectedTariff.id)
                return
            }

            const requestBody: PaymentSubscribePayload = {
                amount: selectedTariff.price,
                email,
                recurrent: true,
                description: selectedTariff.name,
                tariff: {
                    id: selectedTariff.id,
                    duration: selectedTariff.duration,
                    description: selectedTariff.name,
                },
            }

            if (promocode) {
                requestBody.promo_code = promocode
            }

            const res = await subscribeToPayment(requestBody)

            if (!isPaymentResponse(res)) {
                return toastError(
                    'Ошибка при активации подписки',
                    'Не удалось получить подтверждение оплаты',
                )
            }
            // @ts-ignore
            if (res.status === 422) {
                return toastError(
                    'Ошибка при активации подписки',
                    'Обратитесь в тех.поддержку для уточнения вашей проблемы',
                )
            }

            toastSuccess('Платеж инициирован', 'Вы будете перенаправлены для завершения оплаты')

            const user = await refreshUser()

            if (user) {
                localStorage.setItem('me', JSON.stringify(res))
            }

            // Редирект после небольшой паузы
            setTimeout(() => {
                window.location.href = res.payment.confirmation.confirmation_url
            }, 1500)
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error)
            toastError('Ошибка при активации подписки', 'Возможно, подписка уже активирована')
        } finally {
            setLoading(false)
        }
    }, [selectedTariff, email, sendTrialRequest, promocode])

    const toastError = (title: string, subtitle?: string) =>
        toast.custom(() => (
            <div className="bg-[#262833] p-4 rounded-2xl">
                <div className="flex items-center gap-4">
                    <XIcon size={24} color="#FFFFFF" weight="light" />
                    <div>
                        <h1 className="font-manrope text-white font-bold text-sm">{title}</h1>
                        {subtitle && (
                            <p className="font-manrope text-white/80 text-xs font-medium">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        ))

    const toastSuccess = (title: string, subtitle?: string) =>
        toast.custom(() => (
            <div className="bg-[#262833] p-4 rounded-2xl">
                <div className="flex items-center gap-4">
                    <CheckIcon size={32} color="#FFFFFF" weight="light" />
                    <div>
                        <h1 className="font-manrope text-white font-bold text-sm">{title}</h1>
                        {subtitle && (
                            <p className="font-manrope text-white/80 text-xs font-medium">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        ))

    if (!tariffs.length) return null

    return (
        <>
            <Toaster richColors />
            <div className="flex flex-col gap-14 max-w-md mx-auto w-full">
                <div className="w-full flex flex-col items-center justify-center gap-y-5">
                    <div className="w-full flex flex-col gap-y-3.5">
                        <h4 className="font-bold text-black text-xl text-center dark:text-gray-300">
                            Введите свой промокод
                        </h4>
                        <div className="flex flex-col gap-4">
                            <Input
                                name="promocode"
                                type="text"
                                value={promocode}
                                onChange={(e) => setPromocode(e.target.value)}
                                intent={theme === 'dark' ? 'dark' : 'light'}
                                placeholder="Ваш промокод"
                                className="w-full"
                            />
                            <div className="inline-flex items-center">
                                {/* <label
                                    className="flex items-center cursor-pointer relative"
                                    htmlFor="check-2"
                                >
                                    <input
                                        type="checkbox"
                                        checked={isRecurrent}
                                        onChange={handleChangeRecurrent}
                                        className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-[#404455] checked:border-[#404455] dark:checked:bg-[#FDB933] dark:checked:border-[#FDB933]"
                                        id="check-2"
                                    />
                                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 dark:text-black">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3.5 w-3.5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            stroke="currentColor"
                                            stroke-width="1"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </span>
                                </label>
                                <label
                                    className="cursor-pointer ml-2 text-[#92939A] leading-4 text-sm max-w-64"
                                    htmlFor="check-2"
                                >
                                    Согласны ли вы на автопродление подписки в последующие месяцы?
                                </label> */}
                                <p className="cursor-pointer ml-2 text-[#92939A] leading-4 text-sm">
                                    Отменить автопродление подписки вы сможете в разделе активной
                                    подписки, после покупки тарифа
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-y-4 w-full mx-auto">
                    <h1 className="font-bold text-black text-xl text-center dark:text-gray-300">
                        Электронная почта
                    </h1>

                    <div className="flex flex-col gap-y-1.5">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Пример@mail.ru"
                            className="w-full bg-[#D9DCED] rounded-2xl font-medium p-5 outline-none text-dark placeholder:text-[#A1A1A3] transition-all dark:bg-[#262833] dark:text-white"
                        />

                        <Button
                            className="flex justify-center items-center gap-x-5"
                            onClick={handleSubmit}
                            disabled={!email || loading}
                        >
                            <span className="font-semibold text-[#262833] text-sm">Отправить</span>
                            <Image src={blackArrowRightIcon} alt="arrow-right" />
                        </Button>
                    </div>
                </div>

                {/* {isOpenPromo && (
                <Modal>
                    <div className="w-full flex flex-col items-center justify-center gap-y-5">
                        <div className="w-full flex flex-col gap-y-3.5">
                            <h4 className="text-black text-xl font-bold dark:text-white">
                                Введите свой промокод
                            </h4>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    handleSubmit()
                                }}
                            >
                                <div className="flex flex-col gap-4">
                                    <Input
                                        name="promocode"
                                        type="text"
                                        value={promocode}
                                        onChange={(e) => setPromocode(e.target.value)}
                                        intent={theme === 'dark' ? 'black' : 'light'}
                                        placeholder="Ваш промокод"
                                        className="w-full"
                                    />
                                    <div className="inline-flex items-center">
                                        <label
                                            className="flex items-center cursor-pointer relative"
                                            htmlFor="check-2"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={isRecurrent}
                                                onChange={handleChangeRecurrent}
                                                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-[#404455] checked:border-[#404455] dark:checked:bg-[#FDB933] dark:checked:border-[#FDB933]"
                                                id="check-2"
                                            />
                                            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 dark:text-black">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-3.5 w-3.5"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    stroke="currentColor"
                                                    stroke-width="1"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clip-rule="evenodd"
                                                    ></path>
                                                </svg>
                                            </span>
                                        </label>
                                        <label
                                            className="cursor-pointer ml-2 text-[#92939A] leading-4 text-sm max-w-64"
                                            htmlFor="check-2"
                                        >
                                            Согласны ли вы на автопродление подписки в последующие
                                            месяцы?
                                        </label>
                                    </div>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? 'Отправка...' : 'Отправить'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                        <span className="text-[#92939A] text-sm leading-4 max-w-52 text-center">
                            если нет промокода, то просто нажмите на кнопку
                        </span>
                    </div>
                </Modal>
            )} */}
            </div>
        </>
    )
}
