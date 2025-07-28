'use client'

import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import Modal from '@/shared/ui/Modal'
import { passwordRestore } from '@/utils/api/auth.api'
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
                toast.success('Пароль успешно изменен')
                setTimeout(() => router.push('/account'), 2500)
            } catch (error) {
                toast.error('Ошибка при смене пароля')
                setTimeout(() => router.push('/'), 2500)
            }
        } else {
            toast.error('Отсутствует токен или пароль')
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
