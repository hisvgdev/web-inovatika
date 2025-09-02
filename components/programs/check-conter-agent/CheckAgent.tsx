'use client'

import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { fetchFileByInn } from '@/utils/api/files.api'
import { XIcon } from '@phosphor-icons/react'
import React, { useState } from 'react'
import { toast, Toaster } from 'sonner'

export const CheckAgent = () => {
    const [getInn, setGetInn] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const isTelegram = () => {
        if (typeof window === 'undefined') return false
        // @ts-ignore
        return Boolean(window.Telegram?.WebApp?.initData)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!getInn || !/^\d{10}(\d{2})?$/.test(getInn)) {
            setError('Введите корректный ИНН (10 или 12 цифр)')
            return
        }

        setError(null)
        setLoading(true)

        try {
            if (isTelegram()) {
                const success = await fetch(`/api/v1/files/inn/${getInn}?return_to=telegram`)
                if (!success) {
                    toastError('Произошла тех.ошибка', 'Попробуйте еще раз запросить файл по ИНН')
                }
            } else {
                const response = await fetch(`/api/v1/files/inn/${getInn}?return_to=web`)
                if (!response.ok) throw new Error('Ошибка при получении файла')

                const blob = await response.blob()
                const url = window.URL.createObjectURL(blob)

                setTimeout(() => {
                    const link = document.createElement('a')
                    link.href = url
                    link.download = `inovatika-${getInn}.pdf`
                    document.body.appendChild(link)
                    link.click()
                    link.remove()

                    window.URL.revokeObjectURL(url)
                }, 1000)
                toastSuccess('Успешно', 'Подождите около 1-2 секунды мы формируем ваш отчет!')
            }
        } catch (error) {
            setError('Не удалось получить файл. Попробуйте позже.')
            toastError('Произошла тех.ошибка', 'Попробуйте еще раз запросить файл по ИНН')
        } finally {
            setLoading(false)
        }
    }

    const toastSuccess = (title: string, subtitle?: string) =>
        toast.custom(() => (
            <div className="bg-[#262833] p-4 rounded-2xl">
                <div className="flex items-center gap-4">
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

    const toastError = (title: string, subtitle?: string) =>
        toast.custom(() => (
            <div className="bg-[#262833] p-4 rounded-2xl">
                <div className="flex items-center gap-4">
                    <XIcon size={24} color="#FFFFFF" weight="light" />
                    <div>
                        <h1 className="font-manrope text-white font-bold text-sm">{title}</h1>
                        {subtitle && (
                            <p className="font-manrope text-white/80 text-xs font-medium">
                                {' '}
                                {subtitle}{' '}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        ))

    return (
        <>
            <Toaster />
            <div className="flex flex-col h-full justify-center gap-14">
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
                                    {loading
                                        ? isTelegram()
                                            ? 'Ожидайте, результат мы отправим вам в телеграмм'
                                            : 'Ожидайте, мы формируем ваш документ...'
                                        : 'Проверить'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
