import { useTheme } from '@/hooks/useTheme'
import trashBlackIcon from '@/public/assets/icons/trashBlackIcon.svg'
import trashWhiteIcon from '@/public/assets/icons/trashWhiteIcon.svg'
import { unactiveChat } from '@/utils/api/chats.api'
import { CheckIcon, XIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import React, { useCallback } from 'react'
import { toast } from 'sonner'

export const AiClearChatsButton = () => {
    const { theme } = useTheme()

    const handleClearChat = useCallback(async () => {
        try {
            await unactiveChat()
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
        }
    }, [])

    const icon = theme === 'light' ? trashBlackIcon : trashWhiteIcon

    return (
        <button
            type="button"
            className="flex items-center py-3 px-4 rounded-2xl border border-[#262833] cursor-pointer gap-3"
            onClick={handleClearChat}
        >
            <Image src={icon} alt="trash-icon" />
            <span className="text-black font-manrope font-medium text-xs dark:text-white">
                Очистить историю переписки
            </span>
        </button>
    )
}
