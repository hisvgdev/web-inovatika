'use client'

import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import Modal from '@/shared/ui/Modal'
import { passwordRestore } from '@/utils/api/auth.api'
import { CheckIcon, XIcon } from '@phosphor-icons/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast, Toaster } from 'sonner'

export const RestorePass = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [pass, setPass] = useState('')
    const token = searchParams.get('token')

    const handleSendResetPass = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (token && pass) {
            try {
                await passwordRestore({ token, password: pass })
                toast.custom(() => (
                    <div className="bg-[#262833] p-3 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8">
                                <CheckIcon size={24} color="#FFFFFF" weight="light" />
                            </div>
                            <div>
                                <h1 className="font-manrope text-white font-bold text-sm">
                                    Вы успешно изменили свой пароль!
                                </h1>
                                <p className="font-manrope text-white/80 text-xs font-medium">
                                    Пожалуйста, воспользуйтесь своим новым паролем для того чтобы
                                    войти в свой аккаунт.
                                </p>
                            </div>
                        </div>
                    </div>
                ))
                setTimeout(() => router.push('/account'), 2500)
            } catch (error) {
                toast.custom(() => (
                    <div className="bg-[#262833] p-3 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8">
                                <XIcon size={24} color="#FFFFFF" weight="light" />
                            </div>
                            <div>
                                <h1 className="font-manrope text-white font-bold text-sm">
                                    Произошла ошибка при смене пароля!
                                </h1>
                                <p className="font-manrope text-white/80 text-xs font-medium">
                                    Пожалуйста, обратитесь в тех.поддерджку для выяснения
                                    возникновения причины вашей проблемы.
                                </p>
                            </div>
                        </div>
                    </div>
                ))
                setTimeout(() => router.push('/'), 2500)
            }
        } else {
            toast.custom(() => (
                <div className="bg-[#262833] p-3 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8">
                            <XIcon size={24} color="#FFFFFF" weight="light" />
                        </div>
                        <div>
                            <h1 className="font-manrope text-white font-bold text-sm">
                                Обратитесь в тех поддержку для уточнения ошибки!
                            </h1>
                        </div>
                    </div>
                </div>
            ))
            setTimeout(() => router.push('/'), 2500)
        }
    }

    return (
        <Modal>
            <Toaster richColors />
            <div className="flex flex-col gap-3.5">
                <h1 className="font-manrope font-bold text-xl text-black dark:text-white">
                    Изменить пароль
                </h1>
                <form>
                    <div className="flex flex-col gap-2">
                        <Input
                            intent="black"
                            type="password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            placeholder="Ваш новый пароль"
                        />
                        <Button className="w-full" onClick={handleSendResetPass}>
                            Сохранить
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
