'use client'

import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { createUser } from '@/utils/api/users.api'
import { CheckIcon, XIcon } from '@phosphor-icons/react'
import { useForm } from '@tanstack/react-form'
import { redirect } from 'next/navigation'
import React, { FC, useEffect, useState } from 'react'
import { toast, Toaster } from 'sonner'

import { AuthPayload, authSchema } from '@/lib/schema/authSchema'

import { RegisterFormProps } from './RegisterForm.types'

export const RegisterForm: FC<RegisterFormProps> = () => {
    const [tgId, setTgId] = useState<string | null>(null)

    useEffect(() => {
        //@ts-ignore
        if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initDataUnsafe) {
            //@ts-ignore
            const user = window.Telegram.WebApp.initDataUnsafe.user
            if (user?.id) {
                setTgId(String(user.id))
            }
        }
    }, [])
    const form = useForm({
        validators: {
            onChange: authSchema,
        },
        defaultValues: {
            email: '',
            password: '',
        } as AuthPayload,
        onSubmit: async (data) => {
            const formData = new FormData()
            const email = data.value.email || ''
            const pass = data.value.password || ''
            if (email && pass) {
                formData.append('email', email)
                formData.append('password', pass)
                if (tgId) {
                    formData.append('tg_id', tgId)
                }
                const res = await createUser(formData)
                if (res) {
                    toast.custom((t) => (
                        <div className="bg-[#262833] p-4 rounded-2xl">
                            <div className="flex items-center gap-4">
                                <CheckIcon size={32} color="#FFFFFF" weight="light" />
                                <div>
                                    <h1 className="font-manrope text-white font-bold text-sm">
                                        Вы успешно зарегистрировали своего пользователя!
                                    </h1>
                                </div>
                            </div>
                        </div>
                    ))
                    setTimeout(() => {
                        redirect('/auth/login')
                    }, 2500)
                } else {
                    toast.custom((t) => (
                        <div className="bg-[#262833] p-4 rounded-2xl">
                            <div className="flex items-center gap-4">
                                <XIcon size={32} color="#FFFFFF" weight="light" />
                                <div>
                                    <h1 className="font-manrope text-white font-bold text-sm">
                                        Произошла ошибка при регистрации
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
        },
    })
    return (
        <>
            <Toaster richColors />
            <div className="h-full w-full flex items-center justify-center">
                <div className="w-full max-w-md flex flex-col gap-y-4 px-4">
                    <h1 className="text-xl font-bold text-black dark:text-gray-100">
                        Создать учетную запись
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
                            <Button type="submit" disabled={form.state.isSubmitting}>
                                Создать
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
