'use client'

import { Button } from '@/components/ui/Button/Button'
import { createChats } from '@/utils/api/chats.api'
import { XIcon } from '@phosphor-icons/react'
import { useAtom, useSetAtom } from 'jotai'
import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { toast } from 'sonner'

import {
    atomFinishedChooseSettings,
    atomInternetSearch,
    atomSelectedEmo,
    atomSelectedSpecific,
    idFromCreateChat,
} from '@/lib/atom/wsActions'

import { AiModalSpecificEnum } from './AiModalSpecific.types'

const SPECIFICS = [
    { key: AiModalSpecificEnum.noSpecifics, label: 'Вопросы без специализации', emo: '🤖' },
    { key: AiModalSpecificEnum.management, label: 'Руководство и управление', emo: '👔' },
    {
        key: AiModalSpecificEnum.productionTechnical,
        label: 'Производственно-технические процессы',
        emo: '🔧',
    },
    { key: AiModalSpecificEnum.financial, label: 'Финансы и бухгалтерия', emo: '💰' },
    { key: AiModalSpecificEnum.legal, label: 'Юридическая работа', emo: '⚖️' },
    { key: AiModalSpecificEnum.population, label: 'Работа с населением', emo: '🤝🏻' },
]

export const AiModalSpecific = ({
    handleCloseModal,
}: {
    handleCloseModal: (value: boolean) => void
}) => {
    const [selectedSpecific, setSelectedSpecific] =
        useAtom<AiModalSpecificEnum>(atomSelectedSpecific)
    const [selectedEmo, setSelectedEmo] = useAtom(atomSelectedEmo)

    const [internetSearch, setInternetSearch] = useAtom<'default' | 'web_search'>(
        atomInternetSearch,
    )
    const findSpecific = SPECIFICS.find((s) => s.emo === selectedEmo)

    const setId = useSetAtom(idFromCreateChat)

    const setFinishedChooseSettings = useSetAtom(atomFinishedChooseSettings)

    const handleSelectEmo = (emo: string) => {
        setSelectedEmo(emo)
    }

    const handleCreateChat = async () => {
        try {
            const res = await createChats(selectedSpecific)
            if (!res.detail) {
                setId(res.id)
            }
        } catch (error) {
            toast.custom((t) => (
                <div className="bg-[#262833] p-4 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <XIcon size={24} color="#FFFFFF" weight="light" />
                        <div>
                            <h1 className="font-manrope text-white font-bold text-sm">
                                Произошла ошибка изменения спецификации.
                            </h1>
                            <p className="font-manrope text-white/80 text-xs font-medium">
                                Обратитесь в тех.поддержку для подробной информации!
                            </p>
                        </div>
                    </div>
                </div>
            ))
        } finally {
            setFinishedChooseSettings(true)
            handleCloseModal(false)
        }
    }
    useEffect(() => {
        if (selectedSpecific === AiModalSpecificEnum.noSpecifics) {
            setInternetSearch('web_search')
        } else {
            setInternetSearch('default')
        }
    }, [selectedSpecific])

    return createPortal(
        <div className="fixed inset-0 z-40 bg-black/80 flex items-center justify-center">
            <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg text-white font-manrope flex flex-col gap-6 dark:bg-[#262833]">
                <div>
                    <h3 className="text-base font-bold mb-3 text-black dark:text-white">
                        Специфика ИИ бота
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                        {SPECIFICS.map(({ key, label, emo }) => (
                            <div
                                key={key}
                                className={`flex items-center gap-3 rounded-2xl px-4 py-2 cursor-pointer ${
                                    findSpecific?.key === key
                                        ? 'bg-[#FDB933] text-black'
                                        : 'text-black bg-[#EEEFF5] hover:bg-[#FDB933] dark:bg-[#13141A] dark:text-white/70 dark:hover:bg-[#FDB933] transition-all'
                                }`}
                            >
                                <span className="text-2xl">{emo}</span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedSpecific(key)
                                        handleSelectEmo(emo)
                                    }}
                                    className={`text-left text-sm font-medium cursor-pointer`}
                                >
                                    {label}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {/* <div>
                    <h3 className="text-base font-bold mb-3">Поиск в интернете</h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setInternetSearch('web_search')}
                            className={`px-4 py-2.5 rounded-2xl font-medium cursor-pointer hover:bg-[#FDB933] transition-all ${
                                internetSearch === 'web_search'
                                    ? 'bg-[#FDB933] text-black'
                                    : 'text-black bg-[#EEEFF5] dark:bg-[#13141A] dark:text-white/70 dark:hover:hover:bg-[#FDB933] dark:hover:text-black'
                            }`}
                        >
                            Выключен
                        </button>
                        <button
                            onClick={() => setInternetSearch('default')}
                            className={`px-4 py-2.5 rounded-2xl font-medium cursor-pointer hover:bg-[#FDB933] transition-all ${
                                internetSearch === 'default'
                                    ? 'bg-[#FDB933] text-black'
                                    : 'text-black bg-[#EEEFF5] dark:bg-[#13141A] dark:text-white/70 dark:hover:hover:bg-[#FDB933] dark:hover:text-black'
                            }`}
                        >
                            Включен
                        </button>
                    </div>
                </div> */}

                <Button onClick={handleCreateChat}>Применить</Button>
            </div>
        </div>,
        document.body,
    )
}
