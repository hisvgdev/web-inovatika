'use client'

import { useTheme } from '@/hooks/useTheme'
import questionIcon from '@/public/assets/icons/questionCircleIcon.svg'
import settingsIcon from '@/public/assets/icons/settingsIcon.svg'
import { WechatLogoIcon } from '@phosphor-icons/react'
import { useAtom, useAtomValue } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { Drawer } from 'vaul'

import { atomSelectedEmo, isWsConnected, sendWsMessage } from '@/lib/atom/wsActions'

import { AiClearChatsButton } from '../../atoms/AiClearChats/AiClearChatsButton'
import { AiChatsActionsProps } from './AiChatsActions.types'

export const AiChatsActions: FC<AiChatsActionsProps> = (props) => {
    const {
        handleSendMessage,
        handleOpenModal,
        handleClearAll,
        handleChangeDrawer,
        isAwaitingResponse,
    } = props
    const [message, setMessage] = useAtom(sendWsMessage)
    const selectedEmo = useAtomValue(atomSelectedEmo)
    const isConnected = useAtomValue(isWsConnected)
    const { theme } = useTheme()
    return (
        <div className="mt-auto w-full pb-12 lg:pb-0">
            <div className="flex items-end justify-center px-4 gap-10 lg:px-10">
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
                    <div className="flex flex-col-reverse w-full gap-4 items-center lg:flex-row lg:gap-0">
                        <div className="flex items-center gap-1.5 mr-auto">
                            <button
                                type="button"
                                className={`bg-[#EEEFF5] rounded-2xl cursor-pointer hover:bg-[#EEEFF5]/50 dark:bg-[#13141A] dark:hover:bg-[#13141A]/80 transition-all disabled:opacity-70 disabled:cursor-not-allowed ${selectedEmo ? 'py-3 px-3.5' : 'p-3'}`}
                                onClick={() => handleOpenModal(true)}
                                disabled={isAwaitingResponse}
                            >
                                {selectedEmo ? (
                                    <span className="text-xl">{selectedEmo}</span>
                                ) : (
                                    <Image src={settingsIcon} alt="settings-icon" />
                                )}
                            </button>
                            <Link
                                href="/home/ai-chats/info"
                                className="bg-[#EEEFF5] rounded-2xl p-3 cursor-pointer hover:bg-[#EEEFF5]/50 dark:bg-[#13141A] dark:hover:bg-[#13141A]/80 transition-all"
                            >
                                <Image src={questionIcon} alt="question-icon" />
                            </Link>
                            <AiClearChatsButton
                                onClear={handleClearAll}
                                isAwaitingResponse={isAwaitingResponse}
                            />
                            {/* <Drawer.Root direction="right">
                                <Drawer.Trigger asChild>
                                    <button
                                        type="button"
                                        className={`bg-[#EEEFF5] rounded-2xl cursor-pointer hover:bg-[#EEEFF5]/50 dark:bg-[#13141A] dark:hover:bg-[#13141A]/80 transition-all p-3`}
                                        onClick={handleChangeDrawer}
                                    >
                                        <WechatLogoIcon
                                            size={26}
                                            color={theme === 'dark' ? '#939499' : '#FFFFFF'}
                                        />
                                    </button>
                                </Drawer.Trigger>
                                <Drawer.Portal>
                                    <Drawer.Content
                                        className="right-2 top-2 bottom-2 fixed z-10 outline-none w-xl flex"
                                        style={
                                            {
                                                '--initial-transform': 'calc(100% + 8px)',
                                            } as React.CSSProperties
                                        }
                                    >
                                        <div className="bg-gray-200 h-full w-full grow p-5 flex flex-col rounded-2xl dark:bg-[#1D1E27]">
                                            <div className="max-w-md mx-auto">
                                                <Drawer.Title className="font-medium text-xl mb-2 text-white">
                                                    Список ваших доступных чатов
                                                </Drawer.Title>
                                                <Drawer.Description className="text-zinc-500 mb-2">
                                                    На текущий момент времени нет иных доступных
                                                    чатов!
                                                </Drawer.Description>
                                            </div>
                                        </div>
                                    </Drawer.Content>
                                    <Drawer.Overlay className="fixed inset-0 backdrop-blur-xl" />
                                </Drawer.Portal>
                            </Drawer.Root> */}
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3.5 rounded-2xl font-semibold cursor-pointer bg-[#FDB933] disabled:cursor-not-allowed hover:bg-[#FDB933]/80 transition-all lg:w-72"
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
