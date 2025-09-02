import { Button } from '@/components/ui/Button/Button'
import { useTheme } from '@/hooks/useTheme'
import { unactiveChat } from '@/utils/api/chats.api'
import { CheckIcon, TrashSimpleIcon, XIcon } from '@phosphor-icons/react'
import React, { FC, useCallback, useState } from 'react'
import { toast } from 'sonner'

import { AiModalWarningCleartChat } from './AiModalWarningCleartChat/AiModalWarningCleartChat'

interface AiClearChatsButtonProps {
    onClear: () => void
    isAwaitingResponse: boolean
}

export const AiClearChatsButton: FC<AiClearChatsButtonProps> = ({
    onClear,
    isAwaitingResponse,
}) => {
    const [isOpenWarningModal, setIsOpenWarningModal] = useState(false)
    const handleChangeWarningModal = () => setIsOpenWarningModal(!isOpenWarningModal)

    const { theme } = useTheme()

    const handleClearChat = useCallback(async () => {
        try {
            await unactiveChat()
            onClear()
            toast.custom(() => (
                <div className="bg-[#262833] p-4 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <CheckIcon size={24} color="#FFFFFF" weight="light" />
                        <div>
                            <h1 className="font-manrope text-white font-bold text-sm">Успешно!</h1>
                            <p className="font-manrope text-white/80 text-xs font-medium">
                                Вы успешно очистили свой чат! Пожалуйста попробуй перезагрузить
                                страницу если чат еще не очистился
                            </p>
                        </div>
                    </div>
                </div>
            ))
            handleChangeWarningModal()
        } catch (error) {
            console.error('Ошибка при очистке чата:', error)
            toast.custom(() => (
                <div className="bg-[#262833] p-4 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <XIcon size={24} color="#FFFFFF" weight="light" />
                        <div>
                            <h1 className="font-manrope text-white font-bold text-sm">Ошибка.</h1>
                            <p className="font-manrope text-white/80 text-xs font-medium">
                                Обратитесь в тех.поддеркжу для уточнения вашей проблемы!
                            </p>
                        </div>
                    </div>
                </div>
            ))
            handleChangeWarningModal()
        } finally {
            handleChangeWarningModal()
        }
    }, [])

    return (
        <>
            <button
                type="button"
                className="bg-[#EEEFF5] rounded-2xl p-3 cursor-pointer hover:bg-[#EEEFF5]/50 dark:bg-[#13141A] dark:hover:bg-[#13141A]/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleChangeWarningModal}
            >
                <TrashSimpleIcon size={26} color={'#939499'} />
            </button>
            {isOpenWarningModal && (
                <AiModalWarningCleartChat handleClose={handleChangeWarningModal}>
                    <div className="flex flex-col items-center justify-center gap-6">
                        <div className="flex flex-col items-center justify-center text-center gap-4">
                            <h1 className="text-2xl font-bold text-black dark:text-white">
                                Очистить чат
                            </h1>
                            <p className="max-w-md font-medium text-sm text-gray-400">
                                Вы действительно хотите очистить чат? <br /> При подтверждении
                                данного действия , вы полностью очистите текущий чат с нашим ИИ ЖКХ
                            </p>
                        </div>
                        <div className="w-full flex items-center justify-between gap-4">
                            <Button
                                intent="gray"
                                onClick={handleChangeWarningModal}
                                className="w-full"
                            >
                                Отменить
                            </Button>
                            <Button
                                onClick={handleClearChat}
                                className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isAwaitingResponse}
                            >
                                Подтвердить
                            </Button>
                        </div>
                    </div>
                </AiModalWarningCleartChat>
            )}
        </>
    )
}
