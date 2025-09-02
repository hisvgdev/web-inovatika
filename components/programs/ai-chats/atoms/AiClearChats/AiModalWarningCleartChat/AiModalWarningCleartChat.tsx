import { XIcon } from '@phosphor-icons/react'
import React, { FC, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface AiModalWarningCleartChatProps {
    children: React.ReactNode
    handleClose: () => void
}

export const AiModalWarningCleartChat: FC<AiModalWarningCleartChatProps> = (props) => {
    const { children, handleClose } = props

    useEffect(() => {
        window.scrollTo(0, 0)
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = ''
        }
    }, [])

    return createPortal(
        <div className="absolute inset-0 h-dvh w-screen bg-black/20 z-40">
            <div className="h-full flex items-center justify-center">
                <div className="px-4 py-8 bg-white rounded-2xl min-w-96 dark:bg-[#262833]">
                    <div className="flex flex-col gap-y-6">
                        <div className="w-full flex justify-end">
                            <button type="button" className="cursor-pointer" onClick={handleClose}>
                                <XIcon size={24} color="#51535C" />
                            </button>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>,
        document.body,
    )
}
