import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { useTheme } from '@/hooks/useTheme'
import Modal from '@/shared/ui/Modal'
import { loginUser } from '@/utils/api/auth.api'
import { getMe } from '@/utils/api/users.api'
import { CheckIcon, XIcon } from '@phosphor-icons/react'
import { useForm } from '@tanstack/react-form'
import { useQuery } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import React, { FC, useEffect } from 'react'
import { toast, Toaster } from 'sonner'

import { modalType } from '@/lib/atom/modal.atom'
import { AuthPayload, authSchema } from '@/lib/schema/authSchema'

import { AuthModalProps } from './AuthModal.types'

export const AuthModal: FC<AuthModalProps> = (props) => {
    const {} = props
    const { theme } = useTheme()
    const setCurrentType = useSetAtom(modalType)

    const { data: dataMe } = useQuery({
        queryKey: ['get-me'],
        queryFn: async () => await getMe(),
        refetchInterval: 500,
        refetchIntervalInBackground: true,
        staleTime: 0,
    })

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
                try {
                    const res = await loginUser(formData)
                    if (res?.status === 'ok' && dataMe) {
                        toast.custom((t) => (
                            <div className="bg-[#262833] p-3 rounded-2xl">
                                <div className="flex items-center gap-4">
                                    <CheckIcon size={18} color="#FFFFFF" weight="light" />
                                    <div>
                                        <h1 className="font-manrope text-white font-bold text-sm">
                                            Успешно!
                                        </h1>
                                        <p className="font-manrope text-white/80 text-xs font-medium">
                                            Вы успешно авторизовались! Сейчас мы закроем окно
                                            авторизации
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                        setTimeout(() => {
                            localStorage.setItem('me', JSON.stringify(dataMe))
                            setCurrentType('credentials')
                        }, 1500)
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
                } catch (error) {
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
        },
    })

    // const handleTelegramLogin = async () => {
    //     // @ts-ignore
    //     const tg = window.Telegram?.WebApp
    //     const user = tg?.initDataUnsafe?.user
    //     const initData = tg?.initData

    //     if (!user) {
    //         console.log('Не был найден польльзователь с телеграммом', { tg, user })
    //         return
    //     }

    //     try {
    //         const res = await fetch('https://профижкх.рф/api/v1/auth/login/telegram', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 tg_id: user.id,
    //                 init_data: initData,
    //                 type: 'telegram',
    //             }),
    //         })

    //         const data = await res.json()

    //         if (data?.access_token) {
    //             await fetch('/api/set-tokens', {
    //                 method: 'POST',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: JSON.stringify({
    //                     access_token: data.access_token,
    //                     refresh_token: data.refresh_token,
    //                 }),
    //             })

    //             window.location.href = '/'
    //         } else {
    //             toast.custom((t) => (
    //                 <div className="bg-[#262833] p-3 rounded-2xl">
    //                     <div className="flex items-center gap-4">
    //                         <XIcon size={18} color="#FFFFFF" weight="light" />
    //                         <div>
    //                             <h1 className="font-manrope text-white font-bold text-sm">
    //                                 Произошла ошибка авторизации посредством Telegram
    //                             </h1>
    //                             <p className="font-manrope text-white/80 text-xs font-medium">
    //                                 Обратитесь в тех.поддержку для уточнения!
    //                             </p>
    //                         </div>
    //                     </div>
    //                 </div>
    //             ))
    //         }
    //     } catch (e) {
    //         toast.custom((t) => (
    //             <div className="bg-[#262833] p-3 rounded-2xl">
    //                 <div className="flex items-center gap-4">
    //                     <XIcon size={18} color="#FFFFFF" weight="light" />
    //                     <div>
    //                         <h1 className="font-manrope text-white font-bold text-sm">
    //                             Произошла ошибка авторизации посредством Telegram
    //                         </h1>
    //                         <p className="font-manrope text-white/80 text-xs font-medium">
    //                             Обратитесь в тех.поддержку для уточнения!
    //                         </p>
    //                     </div>
    //                 </div>
    //             </div>
    //         ))
    //     }
    // }

    useEffect(() => {
        const logout = async () => {
            await fetch('/api/logout', {
                method: 'POST',
            })
            localStorage.removeItem('me')
        }
        logout()
    }, [])

    return (
        <Modal>
            <Toaster />
            <div className="flex flex-col justify-center items-center gap-y-14">
                <div className="w-full flex flex-col gap-y-4">
                    <h4 className="font-bold text-xl text-black dark:text-white">
                        Войти в учетную запись
                    </h4>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}
                        className="w-full"
                    >
                        <div className="flex flex-col gap-y-2">
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
                                            state.meta.errors[0]?.message
                                                ? 'error'
                                                : theme === 'dark'
                                                  ? 'black'
                                                  : 'light'
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
                                            state.meta.errors[0]?.message
                                                ? 'error'
                                                : theme === 'dark'
                                                  ? 'black'
                                                  : 'light'
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
                            <div className="flex flex-col gap-y-2">
                                <Button type="submit" disabled={form.state.isSubmitting}>
                                    Вход
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
                <button
                    type="button"
                    className="font-normal text-[#92939A] underline cursor-pointer"
                    onClick={() => setCurrentType('recoverUser')}
                >
                    Забыли пароль?
                </button>
            </div>
        </Modal>
    )
}
