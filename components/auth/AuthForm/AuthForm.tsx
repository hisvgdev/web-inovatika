'use client'

import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import tgIcon from '@/public/assets/icons/tgIcon.svg'
import { loginUser } from '@/utils/api/auth.api'
import { XIcon } from '@phosphor-icons/react'
import { useForm } from '@tanstack/react-form'
import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { FC, useEffect } from 'react'
import { toast, Toaster } from 'sonner'

import { telegramApp } from '@/lib/atom/telegram.atom'
import { AuthPayload, authSchema } from '@/lib/schema/authSchema'

import { AuthFormProps } from './AuthForm.types'

export const AuthForm: FC<AuthFormProps> = (props) => {
    const {} = props
    const [isTelegramApp, setIsTelegramApp] = useAtom(telegramApp)

    const form = useForm({
        validators: {
            onChange: authSchema,
        },
        defaultValues: {
            email: '',
            password: '',
        } as AuthPayload,
        onSubmit: async (data) => {
            const email = data.value.email || ''
            const pass = data.value.password || ''
            if (email && pass) {
                const formData = new FormData()
                formData.append('email', email)
                formData.append('password', pass)

                const res = await loginUser(formData)
                if (res) {
                    redirect('/')
                } else {
                    toast.custom((t) => (
                        <div className="bg-[#262833] p-3 rounded-2xl">
                            <div className="flex items-center gap-4">
                                <XIcon size={18} color="#FFFFFF" weight="light" />
                                <div>
                                    <h1 className="font-manrope text-white font-bold text-sm">
                                        Произошла ошибка
                                    </h1>
                                    <p className="font-manrope text-white/80 text-xs font-medium">
                                        Обратитесь в тех.поддержку для уточнения!
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            }
        },
    })

    const handleTelegramLogin = async () => {
        // @ts-ignore
        const tg = window.Telegram?.WebApp
        const user = tg?.initDataUnsafe?.user
        const initData = tg?.initData

        if (!user) {
            console.log('Не был найден польльзователь с телеграммом', { tg, user })
            return
        }

        try {
            const res = await fetch('https://botcalendary.ru/api/v1/auth/login/telegram', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tg_id: user.id,
                    init_data: initData,
                    type: 'telegram',
                }),
            })

            const data = await res.json()

            if (data?.access_token) {
                await fetch('/api/set-tokens', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        access_token: data.access_token,
                        refresh_token: data.refresh_token,
                    }),
                })

                window.location.href = '/'
            } else {
                toast.custom((t) => (
                    <div className="bg-[#262833] p-3 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <XIcon size={18} color="#FFFFFF" weight="light" />
                            <div>
                                <h1 className="font-manrope text-white font-bold text-sm">
                                    Произошла ошибка авторизации посредством Telegram
                                </h1>
                                <p className="font-manrope text-white/80 text-xs font-medium">
                                    Обратитесь в тех.поддержку для уточнения!
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            }
        } catch (e) {
            toast.custom((t) => (
                <div className="bg-[#262833] p-3 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <XIcon size={18} color="#FFFFFF" weight="light" />
                        <div>
                            <h1 className="font-manrope text-white font-bold text-sm">
                                Произошла ошибка авторизации посредством Telegram
                            </h1>
                            <p className="font-manrope text-white/80 text-xs font-medium">
                                Обратитесь в тех.поддержку для уточнения!
                            </p>
                        </div>
                    </div>
                </div>
            ))
        }
    }

    useEffect(() => {
        // @ts-ignore
        const tg = window.Telegram?.WebApp
        const user = tg?.initDataUnsafe?.user
        const initData = tg?.initData

        console.log('[Telegram Init]', { user, initData })

        if (user) {
            setIsTelegramApp(true)
        } else {
            const container = document.getElementById('telegram-login-button')
            const script = document.createElement('script')
            script.src = 'https://telegram.org/js/telegram-widget.js?7'
            script.async = true
            script.setAttribute('data-telegram-login', 'InnovatikaTestBot')
            script.setAttribute('data-size', 'large')
            script.setAttribute('data-userpic', 'false')
            script.setAttribute('data-request-access', 'write')
            script.setAttribute('data-onauth', 'onTelegramAuth(user)')
            container?.appendChild(script)

            const helperScript = document.createElement('script')
            helperScript.src = '/telegram-auth.js'
            helperScript.async = true
            document.body.appendChild(helperScript)

            setIsTelegramApp(false)
        }

        return () => {
            const container = document.getElementById('telegram-login-button')
            container?.replaceChildren()
        }
    }, [])

    return (
        <>
            <Toaster richColors />
            <div className="h-full w-full flex items-center justify-center">
                <div className="w-full max-w-md flex flex-col gap-y-4 px-4">
                    <h1 className="text-xl font-bold text-black dark:text-gray-100">
                        Войти в учетную запись
                    </h1>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}
                    >
                        <div className="flex flex-col gap-y-4 w-full">
                            <div className="flex flex-col gap-y-1">
                                <form.Field
                                    name="email"
                                    children={({ state, handleBlur, handleChange }) => (
                                        <Input
                                            type="text"
                                            placeholder="Ваша почта"
                                            value={state.value}
                                            onBlur={handleBlur}
                                            onChange={(e) => handleChange(e.target.value)}
                                            intent={
                                                state.meta.errors[0]?.message ? 'error' : 'default'
                                            }
                                            error={
                                                state.meta.isTouched
                                                    ? state.meta.errors[0]?.message
                                                    : ''
                                            }
                                        />
                                    )}
                                />
                                <form.Field
                                    name="password"
                                    children={({ state, handleBlur, handleChange }) => (
                                        <Input
                                            type="password"
                                            placeholder="Пароль"
                                            value={state.value}
                                            onBlur={handleBlur}
                                            intent={
                                                state.meta.errors[0]?.message ? 'error' : 'default'
                                            }
                                            onChange={(e) => handleChange(e.target.value)}
                                            error={
                                                state.meta.isTouched
                                                    ? state.meta.errors[0]?.message
                                                    : ''
                                            }
                                        />
                                    )}
                                />
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <Button type="submit" disabled={form.state.isSubmitting}>
                                    Вход
                                </Button>
                                <div className="flex flex-col gap-y-2">
                                    {!isTelegramApp ? (
                                        <div
                                            id="telegram-login-button"
                                            className="flex justify-center"
                                        />
                                    ) : (
                                        <Button
                                            intent="gray"
                                            onClick={handleTelegramLogin}
                                            className="flex justify-center items-center gap-3"
                                        >
                                            <Image src={tgIcon} alt="tg-icon" />
                                            <span>Войти через Telegram</span>
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <Link
                                href="/auth/register"
                                className="font-bold text-sm underline text-[#FDB933] text-center"
                            >
                                Зарегистрироваться
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
