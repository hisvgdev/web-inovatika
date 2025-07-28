import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { useTheme } from '@/hooks/useTheme'
import React, { FC } from 'react'

import { Modal } from '../../Modal/Modal'
import { CreateUserModalProps } from './CreateUserModal.types'

export const CreateUserModal: FC<CreateUserModalProps> = (props) => {
    const {} = props
    const { theme } = useTheme()
    return (
        <Modal>
            <div className="w-full flex flex-col gap-y-3.5">
                <h4 className="text-black text-xl font-bold dark:text-white">
                    Создать учетную запись
                </h4>
                <form>
                    <div className="flex flex-col gap-y-1.5">
                        <Input
                            type="text"
                            intent={theme === 'dark' ? 'black' : 'light'}
                            placeholder="E-mail"
                            className="w-full"
                        />
                        <Input
                            type="text"
                            intent={theme === 'dark' ? 'black' : 'light'}
                            placeholder="Пароль"
                            className="w-full"
                        />
                        <Button type="submit">Зарегистрироваться</Button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
