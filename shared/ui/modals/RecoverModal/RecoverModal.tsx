import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { useTheme } from '@/hooks/useTheme'
import { passwordForgot } from '@/utils/api/auth.api'
import { getEmailFromStorage } from '@/utils/helpers/getEmailFromStorage'
import { CheckIcon, XIcon } from '@phosphor-icons/react'
import React, { FC, useState } from 'react'
import { toast, Toaster } from 'sonner'

import { Modal } from '../../Modal/Modal'
import { RecoverModalProps } from './RecoverModal.types'

export const RecoverModal: FC<RecoverModalProps> = () => {
    const { theme } = useTheme()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState(() => getEmailFromStorage() ?? '')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)

        try {
            await passwordForgot(formData)
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
                                Пожалуйста, проверьте почту. Если письма нет, загляните в раздел
                                &quot;Спам&quot;.
                            </p>
                        </div>
                    </div>
                </div>
            ))
        } catch (err: any) {
            const isNotFound = err?.response?.status === 404
            toast.custom(() => (
                <div className="bg-[#262833] p-3 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8">
                            <XIcon size={24} color="#FFFFFF" weight="light" />
                        </div>
                        <div>
                            <h1 className="font-manrope text-white font-bold text-sm">
                                {isNotFound ? 'Пользователь не найден!' : 'Произошла ошибка!'}
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
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal>
            <Toaster />
            <div className="w-full flex flex-col items-center justify-center gap-y-5">
                <div className="w-full flex flex-col gap-y-3.5">
                    <h4 className="text-black text-xl font-bold dark:text-white">
                        Восстановить доступ
                    </h4>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-y-1.5">
                            <Input
                                name="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                intent={theme === 'dark' ? 'black' : 'light'}
                                placeholder="Ваша почта"
                                className="w-full"
                            />
                            <Button type="submit" disabled={loading || email.trim() === ''}>
                                {loading ? 'Отправка...' : 'Сбросить пароль'}
                            </Button>
                        </div>
                    </form>
                </div>
                <span className="text-[#92939A] text-sm max-w-52 text-center">
                    На почту придёт ссылка восстановления пароля
                </span>
            </div>
        </Modal>
    )
}
