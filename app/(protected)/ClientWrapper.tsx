'use client'

import ChangePasswordModal from '@/shared/ui/modals/ChangePasswordModal'
import { GetMeProps } from '@/utils/api/types/types.api'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

import { isModalOpen, modalType } from '@/lib/atom/modal.atom'

interface ClientWrapperProps {
    me?: GetMeProps
    children: React.ReactNode
}

export default function ClientWrapper({ me, children }: ClientWrapperProps) {
    const [typeModal, setTypeModal] = useAtom(modalType)
    const [isModalChangePassOpen, setIsModalChangePassOpen] = useAtom(isModalOpen)

    useEffect(() => {
        if (me) {
            localStorage.setItem('me', JSON.stringify(me))
            if (me.user.email === null) {
                setTypeModal('telegram')
                setIsModalChangePassOpen(true)
            }
        }
    }, [me])

    useEffect(() => {
        // @ts-ignore
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            // @ts-ignore
            const tg = window.Telegram.WebApp

            if (typeof tg.requestFullscreen === 'function') {
                try {
                    tg.requestFullscreen()
                } catch (err) {
                    console.warn('Fullscreen not supported:', err)
                }
            }

            if (typeof tg.lockOrientation === 'function') {
                try {
                    tg.lockOrientation('landscape')
                } catch (err) {
                    console.warn('Orientation lock not supported:', err)
                }
            }
        }
    }, [])

    return (
        <>
            {isModalChangePassOpen && typeModal === 'telegram' && me?.user.email === null && (
                <ChangePasswordModal />
            )}
            {children}
        </>
    )
}
