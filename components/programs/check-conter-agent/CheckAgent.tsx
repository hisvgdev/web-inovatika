'use client'

import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import checkSubscriptionIcon from '@/public/assets/icons/checkSubscriptionIcon.svg'
import { fetchFileByInn } from '@/utils/api/files.api'
import { BellIcon, CheckIcon, XIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast, Toaster } from 'sonner'

export const CheckAgent = () => {
    const [getInn, setGetInn] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!getInn || !/^\d{10}(\d{2})?$/.test(getInn)) {
            setError('Введите корректный ИНН (10 или 12 цифр)')
            return
        }

        setError(null)
        setLoading(true)

        try {
            const fileBlob = await fetchFileByInn(getInn)

            if (fileBlob) {
                const url = window.URL.createObjectURL(fileBlob as Blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `inn-${getInn}.pdf`
                document.body.appendChild(a)
                a.click()
                a.remove()
                window.URL.revokeObjectURL(url)

                setTimeout(() => {
                    toast.custom(() => (
                        <div className="bg-[#262833] p-3 rounded-2xl">
                            <div className="flex items-center gap-4">
                                <CheckIcon size={32} color="#FFFFFF" weight="light" />
                                <div>
                                    <h1 className="font-manrope text-white font-bold text-sm">
                                        Успешное выполнение запроса
                                    </h1>
                                    <p className="font-manrope text-white/80 text-xs font-medium">
                                        Подождите скачивание файла
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                }, 1000)
            } else {
                if (fileBlob === false) {
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
                                        <Image
                                            src={checkSubscriptionIcon}
                                            alt="Проверить подписку"
                                        />
                                        <span className="font-medium text-xs text-black dark:text-gray-300">
                                            Проверить подписку
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))
                } else {
                    toast.custom(() => (
                        <div className="bg-[#262833] p-3 rounded-2xl">
                            <div className="flex items-center gap-4">
                                <XIcon size={32} color="#FFFFFF" weight="light" />
                                <div>
                                    <h1 className="font-manrope text-white font-bold text-sm">
                                        Произошла ошибка
                                    </h1>
                                    <p className="font-manrope text-white/80 text-xs font-medium">
                                        Не удалось получить файл. Обратитесь в тех.поддержку!
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            }
        } catch (error: any) {
            setError('Не удалось получить файл. Попробуйте позже.')
            toast.custom(() => (
                <div className="bg-[#262833] p-3 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <XIcon size={32} color="#FFFFFF" weight="light" />
                        <div>
                            <h1 className="font-manrope text-white font-bold text-sm">
                                Произошла ошибка
                            </h1>
                            <p className="font-manrope text-white/80 text-xs font-medium">
                                Не удалось получить файл. Обратитесь в тех.поддержку!
                            </p>
                        </div>
                    </div>
                </div>
            ))
        }

        setLoading(false)
    }

    return (
        <>
            <Toaster />
            <div className="flex flex-col h-[60vh] justify-center gap-14 lg:h-[80vh]">
                {/* <Link href="/" className="flex items-center gap-3.5 lg:hidden">
                    <ArrowLeftIcon color={theme === 'light' ? 'black' : 'white'} size={24} />
                    <span className="text-black dark:text-white">Назад</span>
                </Link> */}
                <div className="flex items-center justify-center max-w-96 mx-auto md:max-w-full">
                    <div className="flex flex-col gap-y-7">
                        <div className="flex flex-col gap-y-4">
                            <h1 className="text-start text-black font-bold text-xl dark:text-white lg:text-center">
                                Проверка контрагента
                            </h1>
                            <div className="bg-[#FDB93333] text-black p-6 rounded-xl border-l-2 border-yellow-500 max-w-md dark:bg-[#3d2f17]">
                                <p className="text-sm font-semibold dark:text-white">
                                    Введите ИНН контрагента в поле ниже и нажмите кнопку
                                    &quot;Проверить&quot;.
                                </p>
                                <p className="mt-4 text-sm text-black dark:text-white">
                                    Результаты проверки будут предоставлены в виде PDF-файла,
                                    который вы сможете скачать.
                                </p>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="max-w-md flex flex-col justify-center gap-y-3">
                                <div className="flex flex-col gap-y-4">
                                    <label
                                        htmlFor="INN"
                                        className="text-black font-bold text-sm dark:text-white"
                                    >
                                        Введите ИНН контрагента
                                    </label>
                                    <Input
                                        name="INN"
                                        id="INN"
                                        intent="dark"
                                        onChange={(e) => setGetInn(e.target.value)}
                                        placeholder="(10 или 12 цифр)"
                                        value={getInn}
                                    />
                                </div>
                                {error && (
                                    <p className="text-red-500 text-sm font-medium">{error}</p>
                                )}
                                <Button type="submit" disabled={loading}>
                                    {loading ? 'Загрузка...' : 'Проверить'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
