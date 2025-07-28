import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { useTheme } from '@/hooks/useTheme'
import Modal from '@/shared/ui/Modal'
import { passwordReset, passwordTelegramSet, updateTelegramUser } from '@/utils/api/auth.api'
import { CheckIcon, XIcon } from '@phosphor-icons/react'
import { useForm } from '@tanstack/react-form'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import React, { FC, useEffect, useState } from 'react'
import { toast, Toaster } from 'sonner'

import { isModalOpen, modalSetPassFromTg, modalType } from '@/lib/atom/modal.atom'

import { changePassSchema, ChangePassType } from './ChangePasswordModal.schema'
import { ChangePasswordModalProps } from './ChangePasswordModal.types'

export const ChangePasswordModal: FC<ChangePasswordModalProps> = (props) => {
    const {} = props
    const modalTypeValue = useAtomValue(modalType)
    const [isModalTgPassOpen, setIsModalTgPassOpen] = useAtom(modalSetPassFromTg)
    const isFromTelegram = modalTypeValue === 'telegram'
    const setOpen = useSetAtom(isModalOpen)
    const [getUserId, setUserId] = useState<string | null>(null)
    const [getUserTgId, setUserTgId] = useState<number | null>(null)

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        const storage = localStorage.getItem('me')

        if (storage) {
            try {
                const parsed = JSON.parse(storage)
                const id = parsed?.user?.id
                const tgId = parsed?.user?.tg_id

                if (id) setUserId(id)
                if (tgId !== undefined && tgId !== null) setUserTgId(tgId)
            } catch (err) {
                console.warn('Ошибка парсинга localStorage:', err)
            }
        }
    }, [])

    const { theme } = useTheme()
    const form = useForm({
        validators: {
            onChange: changePassSchema,
        },
        defaultValues: {
            email: '',
            password: '',
            repeatPassword: '',
        } as ChangePassType,
        onSubmit: async (data) => {
            const formData = new FormData()
            formData.set('email', data.value.email)
            formData.set('password', data.value.password)

            const requestDataUpdateUserBody = {
                tg_id: Number(getUserTgId),
            }

            if (isFromTelegram) {
                try {
                    await passwordTelegramSet(formData)
                    await updateTelegramUser(requestDataUpdateUserBody, getUserId || '')
                    toast.custom((t) => (
                        <div className="bg-[#262833] p-4 rounded-2xl">
                            <div className="flex items-center gap-4">
                                <XIcon size={18} color="#FFFFFF" weight="light" />
                                <div>
                                    <h1 className="font-manrope text-white font-bold text-sm">
                                        Успешно!
                                    </h1>
                                </div>
                            </div>
                        </div>
                    ))
                    setTimeout(() => {
                        handleClose()
                    }, 1200)
                } catch (error) {
                    toast.custom((t) => (
                        <div className="bg-[#262833] p-4 rounded-2xl">
                            <div className="flex items-center gap-4">
                                <CheckIcon size={18} color="#FFFFFF" weight="light" />
                                <div>
                                    <h1 className="font-manrope text-white font-bold text-sm">
                                        Произошла ошибка!
                                    </h1>
                                    <p className="font-manrope text-white/80 text-xs font-medium">
                                        Пожалуйста обратитесь в тех.поддержку для уточнения вашей
                                        проблемы.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            } else {
                setIsModalTgPassOpen(false)
                await passwordReset(formData)
            }
        },
    })
    return (
        <Modal>
            <Toaster />
            <div className="flex flex-col justify-center items-center gap-y-14">
                <div className="w-full flex flex-col gap-y-4">
                    <div className="flex flex-col gap-3">
                        <h4 className="font-bold text-xl text-black dark:text-white">
                            Изменить пароль
                        </h4>
                        {isModalTgPassOpen && (
                            <p className="text-sm font-manrope text-white/80">
                                Измените свой пароль для последующего входа на платформу
                            </p>
                        )}
                    </div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}
                        className="w-full"
                    >
                        <div className="flex flex-col gap-y-2">
                            <form.Field name="email">
                                {(field) => (
                                    <Input
                                        intent={theme === 'dark' ? 'black' : 'light'}
                                        type="text"
                                        placeholder="Ваша почта"
                                        className="w-full"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        error={field.state.meta.errors[0]?.message}
                                    />
                                )}
                            </form.Field>
                            <form.Field name="password">
                                {(field) => (
                                    <Input
                                        intent={theme === 'dark' ? 'black' : 'light'}
                                        type="password"
                                        placeholder="Пароль"
                                        className="w-full"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        error={field.state.meta.errors[0]?.message}
                                    />
                                )}
                            </form.Field>
                            <form.Field name="repeatPassword">
                                {(field) => (
                                    <Input
                                        intent={theme === 'dark' ? 'black' : 'light'}
                                        type="password"
                                        placeholder="Повторите пароль"
                                        className="w-full"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        error={field.state.meta.errors[0]?.message}
                                    />
                                )}
                            </form.Field>

                            <Button type="submit" disabled={form.state.isSubmitting}>
                                Cохранить
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}
