'use client'

import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { passwordForgot } from '@/utils/api/auth.api'
import { CheckIcon, XIcon } from '@phosphor-icons/react'
import { useForm } from '@tanstack/react-form'
import { toast, Toaster } from 'sonner'

import { RecoverUserPayload, recoverUserSchema } from '@/lib/schema/recoverUserSchema'

export default function RecoverUser() {
    const form = useForm({
        defaultValues: {
            email: '',
        } as RecoverUserPayload,
        validators: {
            onChange: recoverUserSchema,
        },
        onSubmit: (data) => {
            const formData = new FormData()
            formData.append('email', data.value.email)

            passwordForgot(formData)
                .then((res) =>
                    toast.custom(() => (
                        <div className="bg-[#262833] p-3 rounded-2xl">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8">
                                    <CheckIcon size={24} color="#FFFFFF" weight="light" />
                                </div>
                                <div>
                                    <h1 className="font-manrope text-white font-bold text-sm">
                                        Запрос успешно отправлен!
                                    </h1>
                                    <p className="font-manrope text-white/80 text-xs font-medium">
                                        Пожалуйста, проверьте почту. Если письма нет, загляните в
                                        раздел &quot;Спам&quot;.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )),
                )
                .catch((err: any) => {
                    const isNotFound = err?.response?.status === 404
                    toast.custom(() => (
                        <div className="bg-[#262833] p-3 rounded-2xl">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8">
                                    <XIcon size={24} color="#FFFFFF" weight="light" />
                                </div>
                                <div>
                                    <h1 className="font-manrope text-white font-bold text-sm">
                                        {isNotFound
                                            ? 'Пользователь не найден!'
                                            : 'Произошла ошибка!'}
                                    </h1>
                                    <p className="font-manrope text-white/80 text-xs font-medium">
                                        {isNotFound
                                            ? 'Пользователь с такой почтой не найден. Проверьте корректность ввода.'
                                            : 'Пожалуйста, попробуйте позже или проверьте соединение с интернетом.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                })
        },
    })
    return (
        <>
            <Toaster richColors />
            <div className="w-full max-w-md flex flex-col gap-y-4 px-4">
                <h1 className="text-xl font-bold text-black dark:text-gray-100">
                    Восстановить доступ от аккаунта
                </h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}
                >
                    <div className="flex flex-col gap-y-4 w-full">
                        <div className="w-full flex flex-col gap-y-1">
                            <form.Field
                                name="email"
                                children={({ state, handleBlur, handleChange }) => (
                                    <Input
                                        type="text"
                                        placeholder="Ваша почта"
                                        value={state.value}
                                        onBlur={handleBlur}
                                        onChange={(e) => handleChange(e.target.value)}
                                        intent={state.meta.errors[0]?.message ? 'error' : 'default'}
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
                                Восстановить доступ
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
