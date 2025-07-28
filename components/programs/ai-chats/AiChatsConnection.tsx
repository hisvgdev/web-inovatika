'use client'

import { useTheme } from '@/hooks/useTheme'
import checkSubscriptionIcon from '@/public/assets/icons/checkSubscriptionIcon.svg'
import { createChats, getChatsActive } from '@/utils/api/chats.api'
import { BellIcon, CheckIcon, XIcon } from '@phosphor-icons/react'
import { useAtom, useAtomValue } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { toast, Toaster } from 'sonner'

import {
    atomInternetSearch,
    atomSelectedSpecific,
    idFromCreateChat,
    isWsConnected,
    sendWsMessage,
} from '@/lib/atom/wsActions'

import { AiChatsGridProps } from './AiChatsConnection.types'
import { AiClearChatsButton } from './atoms/AiClearChats/AiClearChatsButton'
import AiChatsActions from './molecules/AiChatsActions'
import AiModalSpecific from './molecules/AiModalSpecific'

export interface MsgFromWsProps {
    id?: string
    chat_id?: string
    user_request: string
    ai_response: string
    created_at?: string
    updated_at?: string
}

export interface ChatMessage {
    id?: string
    chat_id?: string
    role: 'user' | 'ai'
    content: string
    created_at?: string
    temp?: boolean
}

export const AiChatsConnection: FC<AiChatsGridProps> = ({ token }) => {
    const socket = useRef<WebSocket | null>(null)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isInitialized, setIsInitialized] = useState(false)
    const [message, setMessage] = useAtom(sendWsMessage)
    const [isConnected, setIsConnected] = useAtom(isWsConnected)
    const selectedSpecific = useAtomValue(atomSelectedSpecific)
    const internetSearch = useAtomValue(atomInternetSearch)
    const [id, setId] = useAtom(idFromCreateChat)
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
    const [isAwaitingResponse, setIsAwaitingResponse] = useState(false)

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const prevSpecificRef = useRef<string | null>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chatMessages, isAwaitingResponse])

    const fetchActiveChatId = async () => {
        try {
            const res = await getChatsActive()

            if (res === false) {
                return toast.custom((t) => (
                    <div className="flex flex-col gap-3">
                        <div className="bg-[#262833] p-3 rounded-2xl">
                            <div className="flex items-center gap-4">
                                <BellIcon size={32} color="#FFFFFF" weight="fill" />
                                <div>
                                    <h1 className="font-manrope text-white font-bold text-sm">
                                        У вас нет активной подписки
                                    </h1>
                                    <p className="font-manrope text-white/80 text-xs font-medium">
                                        Приобрести подписку можно перейдя по кнопке ниже
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <Link
                                href="/subscription"
                                className="py-3 px-10 rounded-2xl bg-[#FDB933] font-manrope font-semibold text-xs"
                            >
                                Подключить
                            </Link>
                            <Link
                                type="button"
                                className="flex justify-center cursor-pointer"
                                href="/subscription"
                            >
                                <div className="bg-white rounded-2xl flex items-center gap-2.5 py-3 px-4 hover:opacity-70 dark:bg-[#262833] transition-all">
                                    <Image src={checkSubscriptionIcon} alt="Проверить подписку" />
                                    <span className="font-medium text-xs text-black dark:text-gray-300">
                                        Проверить подписку
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))
            }
            if (typeof res !== 'boolean' && res?.id) {
                setId(res.id)
            } else {
                const created = await createChats(selectedSpecific)
                if (!created.detail && created.id) {
                    setId(created.id)
                }
            }
        } catch (error) {
            const created = await createChats(selectedSpecific)
            if (!created.detail && created.id) {
                setId(created.id)
            }
            console.error('Ошибка при получении активного чата:', error)
        } finally {
            setIsInitialized(true)
        }
    }

    const connectWebSocket = () => {
        if (socket.current) {
            socket.current.close()
        }

        const ws = new WebSocket(`wss://botcalendary.ru/api/v1/ws/chat/${id}?access_token=${token}`)
        socket.current = ws

        ws.onopen = () => {
            setIsConnected(true)
            toast.custom(() => (
                <div className="bg-[#262833] p-4 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <CheckIcon size={24} color="#FFFFFF" weight="light" />
                        <div>
                            <h1 className="font-manrope text-white font-bold text-sm">
                                Успешное подключение!
                            </h1>
                        </div>
                    </div>
                </div>
            ))
        }

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data) as MsgFromWsProps | MsgFromWsProps[]
            const newMessages = Array.isArray(data) ? data : [data]

            setChatMessages((prev) => {
                const withoutTemp = prev.filter(
                    (m) => !m.temp || !newMessages.some((msg) => msg.user_request === m.content),
                )

                const updatedMessages = [...withoutTemp]

                newMessages.forEach((msg) => {
                    const messageExists = updatedMessages.some(
                        (m) => m.content === msg.user_request && m.role === 'user',
                    )

                    if (!messageExists) {
                        updatedMessages.push({
                            role: 'user',
                            content: msg.user_request,
                            created_at: msg.created_at,
                            chat_id: msg.chat_id,
                            id: msg.id,
                        })

                        updatedMessages.push({
                            role: 'ai',
                            content: msg.ai_response,
                            created_at: msg.updated_at,
                            chat_id: msg.chat_id,
                            id: msg.id,
                        })
                    }
                })

                return updatedMessages.sort((a, b) => {
                    const aDate = new Date(a.created_at || '').getTime()
                    const bDate = new Date(b.created_at || '').getTime()
                    return aDate - bDate
                })
            })

            setIsAwaitingResponse(false)
        }

        ws.onclose = () => {
            setIsConnected(false)
        }

        ws.onerror = (error) => {
            console.error('WebSocket ошибка:', error)
            toast.custom(() => (
                <div className="bg-[#262833] p-4 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <XIcon size={24} color="#FFFFFF" weight="light" />
                        <div>
                            <h1 className="font-manrope text-white font-bold text-sm">
                                Произошла ошибка подключения.
                            </h1>
                            <p className="font-manrope text-white/80 text-xs font-medium">
                                Обратитесь в техподдержку.
                            </p>
                        </div>
                    </div>
                </div>
            ))
        }
    }

    const handleSendMessage = () => {
        if (!message.trim()) return

        const tempMessage: ChatMessage = {
            role: 'user',
            content: message,
            created_at: new Date().toISOString(),
            temp: true,
        }

        setChatMessages((prev) => [...prev, tempMessage])
        setIsAwaitingResponse(true)

        if (socket.current && isConnected) {
            socket.current.send(JSON.stringify({ chat_type: internetSearch, message }))
            setMessage('')
        } else {
            setIsAwaitingResponse(false)
            toast.custom(() => (
                <div className="bg-[#262833] p-4 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <XIcon size={24} color="#FFFFFF" weight="light" />
                        <div>
                            <h1 className="font-manrope text-white font-bold text-sm">
                                Произошла ошибка.
                            </h1>
                            <p className="font-manrope text-white/80 text-xs font-medium">
                                Обратитесь в техподдержку.
                            </p>
                        </div>
                    </div>
                </div>
            ))
        }
    }

    useEffect(() => {
        fetchActiveChatId()
    }, [])

    useEffect(() => {
        if (isInitialized && id?.trim()) {
            connectWebSocket()
        }

        return () => {
            socket.current?.close()
        }
    }, [isInitialized, id])

    useEffect(() => {
        if (
            id?.trim() &&
            prevSpecificRef.current !== null &&
            prevSpecificRef.current !== selectedSpecific
        ) {
            toast.custom(() => (
                <div className="bg-[#262833] p-4 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <CheckIcon size={24} color="#FFFFFF" weight="light" />
                        <div>
                            <h1 className="font-manrope text-white font-bold text-sm">
                                Изменена специфика.
                            </h1>
                            <p className="font-manrope text-white/80 text-xs font-medium">
                                Подождите, мы настраиваем чат...
                            </p>
                        </div>
                    </div>
                </div>
            ))
            connectWebSocket()
        }

        prevSpecificRef.current = selectedSpecific
    }, [selectedSpecific, id])

    return (
        <div className="mt-12">
            <Toaster richColors />
            <div className="flex flex-col gap-3 px-4 lg:hidden">
                {/* <Link href="/" className="flex items-center gap-3.5">
                    <ArrowLeftIcon color={theme === 'light' ? 'black' : 'white'} size={24} />
                    <span className="text-black dark:text-white">Назад</span>
                </Link> */}
                <div className="flex justify-end mb-8">
                    <AiClearChatsButton />
                </div>
            </div>

            <div className="flex items-center justify-center flex-col gap-y-6 mx-auto h-[75vh] lg:h-[80vh]">
                <div className="w-full h-[60vh] overflow-auto px-4 lg:h-[80vh] lg:px-0 lg:pl-64 lg:mt-8 lg:pr-14 lg:mx-auto space-y-6">
                    {chatMessages.map((msg, idx) => (
                        <div key={`${msg.id || idx}-${msg.content}`} className="flex items-center">
                            {msg.role === 'ai' ? (
                                <div className="bg-white p-2.5 rounded-xl max-w-[80%] dark:bg-[#1D1E27]">
                                    <p className="font-manrope text-sm font-medium text-black dark:text-white">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {msg.content}
                                        </ReactMarkdown>
                                    </p>
                                </div>
                            ) : (
                                <div className="ml-auto bg-[#262833] p-2.5 rounded-xl max-w-[80%] opacity-90 dark:bg-[#595D76]">
                                    <p className="font-manrope text-sm font-medium text-white">
                                        {msg.content}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}

                    {isAwaitingResponse && (
                        <div className="flex items-center">
                            <div className="bg-white p-2.5 rounded-xl max-w-[80%] dark:bg-[#1D1E27] animate-pulse">
                                <p className="font-manrope text-sm font-medium text-black dark:text-white opacity-50">
                                    AI печатает...
                                </p>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {isOpenModal && <AiModalSpecific handleCloseModal={setIsOpenModal} />}

                <AiChatsActions
                    handleSendMessage={handleSendMessage}
                    handleOpenModal={setIsOpenModal}
                />
            </div>
        </div>
    )
}
