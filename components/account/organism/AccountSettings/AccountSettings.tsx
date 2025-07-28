'use client'

import { Button } from '@/components/ui/Button/Button'
import AuthModal from '@/shared/ui/modals/AuthModal'
import CreateUserModal from '@/shared/ui/modals/CreateUserModal'
import RecoverModal from '@/shared/ui/modals/RecoverModal'
import { disableSubscription } from '@/utils/api/subscriptions.api'
import { CheckIcon, XIcon } from '@phosphor-icons/react'
import { useAtomValue, useSetAtom } from 'jotai'
import React, { FC, useEffect, useState } from 'react'
import { toast, Toaster } from 'sonner'

import { modalType } from '@/lib/atom/modal.atom'
import { telegramApp } from '@/lib/atom/telegram.atom'

import ChangePasswordModal from '../../../../shared/ui/modals/ChangePasswordModal'
import AccountCredentials from '../../molecules/AccountCredentials'
import { AccountSettingsProps } from './AccountSettings.types'

export const AccountSettings: FC<AccountSettingsProps> = () => {
    const [hasSubscription, setHasSubscription] = useState(false)
    const currentType = useAtomValue(modalType)
    const setCurrentType = useSetAtom(modalType)
    const isTelegramApp = useAtomValue(telegramApp)

    const contentMap = {
        credentials: <AccountCredentials setContentType={setCurrentType} />,
        changePasswordUser: <ChangePasswordModal />,
        authUser: <AuthModal />,
        recoverUser: <RecoverModal />,
        createUser: <CreateUserModal />,
        telegram: <ChangePasswordModal />,
    } as const satisfies Record<string, React.JSX.Element>

    useEffect(() => {
        const me = localStorage.getItem('me')
        if (me) {
            const parsedMe = JSON.parse(me)
            if (parsedMe.subscription) {
                if (parsedMe.subscription.is_active) {
                    setHasSubscription(true)
                } else {
                    setHasSubscription(false)
                }
            } else {
                setHasSubscription(false)
            }
        }
    }, [])

    return (
        <>
            <Toaster />
            <div className="flex flex-col gap-8 items-center justify-center relative overflow-y-auto h-[60vh] lg:h-[80vh]">
                {currentType && contentMap[currentType]}
                {!isTelegramApp && (
                    <div className="absolute bottom-8">
                        <div className="flex flex-col items-center justify-center gap-y-1">
                            <h4 className="text-black font-bold text-sm dark:text-white">
                                Есть другой аккаунт?
                            </h4>
                            <button
                                type="button"
                                className="underline text-[#FDB933] font-bold text-sm cursor-pointer"
                                onClick={() => setCurrentType('authUser')}
                            >
                                Войти
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
