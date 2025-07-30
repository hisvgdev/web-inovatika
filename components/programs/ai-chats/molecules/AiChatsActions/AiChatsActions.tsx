import questionIcon from '@/public/assets/icons/questionCircleIcon.svg'
import settingsIcon from '@/public/assets/icons/settingsIcon.svg'
import { useAtom, useAtomValue } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

import { atomSelectedEmo, isWsConnected, sendWsMessage } from '@/lib/atom/wsActions'

import { AiClearChatsButton } from '../../atoms/AiClearChats/AiClearChatsButton'
import { AiChatsActionsProps } from './AiChatsActions.types'

export const AiChatsActions: FC<AiChatsActionsProps> = (props) => {
    const { handleSendMessage, handleOpenModal } = props
    const [message, setMessage] = useAtom(sendWsMessage)
    const selectedEmo = useAtomValue(atomSelectedEmo)
    const isConnected = useAtomValue(isWsConnected)

    return (
        <div className="mt-auto w-full pb-12 lg:pb-0">
            <div className="flex items-end justify-center px-4 gap-10 lg:px-10">
                {/* <div className="hidden lg:block">
                    <AiClearChatsButton />
                </div> */}
                <div className="flex flex-col gap-6 grow p-4 bg-white rounded-3xl lg:p-2.5 lg:gap-y-1.5 dark:bg-[#262833]">
                    <input
                        type="text"
                        placeholder="Введите ваш запрос..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()
                                handleSendMessage()
                            }
                        }}
                        className="w-full bg-transparent p-3 outline-none text-black/80 font-medium dark:text-white/80 dark:placeholder:text-white/70"
                    />
                    <div className="flex items-center">
                        <div className="flex items-center gap-1.5 mr-auto">
                            <button
                                type="button"
                                className={`bg-[#EEEFF5] rounded-2xl cursor-pointer hover:bg-[#EEEFF5]/50 dark:bg-[#13141A] dark:hover:bg-[#13141A]/80 transition-all ${selectedEmo ? 'py-3.5 px-4' : 'p-3'}`}
                                onClick={() => handleOpenModal(true)}
                            >
                                {selectedEmo ? (
                                    selectedEmo
                                ) : (
                                    <Image src={settingsIcon} alt="settings-icon" />
                                )}
                            </button>
                            <Link
                                href="/programs/ai-chats/info"
                                className="bg-[#EEEFF5] rounded-2xl p-3 cursor-pointer hover:bg-[#EEEFF5]/50 dark:bg-[#13141A] dark:hover:bg-[#13141A]/80 transition-all"
                            >
                                <Image src={questionIcon} alt="question-icon" />
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="w-50 py-3.5 rounded-2xl font-semibold cursor-pointer bg-[#FDB933] disabled:cursor-not-allowed hover:bg-[#FDB933]/80 transition-all lg:w-72"
                            disabled={!isConnected || !message.trim()}
                            onClick={handleSendMessage}
                        >
                            Отправить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
