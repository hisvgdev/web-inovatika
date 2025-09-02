'use client'

import letterIcon from '@/public/assets/icons/letterIcon.svg'
import penIcon from '@/public/assets/icons/penIcon.svg'
import { sendEmailVerification } from '@/utils/api/users.api'
import { getEmailFromStorage } from '@/utils/helpers/getEmailFromStorage'
import { getIsVerifiedFromStorage } from '@/utils/helpers/getIsVerifiedFromStorage'
import { CheckIcon, XIcon } from '@phosphor-icons/react'
import Image from 'next/image'
import React, { FC, useState } from 'react'
import { toast, Toaster } from 'sonner'

import { AccountCredentialsProps } from './AccountCredentials.types'

export const AccountCredentials: FC<AccountCredentialsProps> = (props) => {
    const {} = props

    const [email, setEmail] = useState(() => getEmailFromStorage() ?? '')
    const [isVerified, setIsVerified] = useState<boolean>(() => getIsVerifiedFromStorage() ?? false)

    const isEmailValid = (value: string) => /\S+@\S+\.\S+/.test(value)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('email', email)

        try {
            const res = await sendEmailVerification(formData)
            if (res.status === 'ok') {
                toast.custom(() => (
                    <div className="bg-[#262833] p-3 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8">
                                <CheckIcon size={24} color="#FFFFFF" weight="light" />
                            </div>
                            <div>
                                <h1 className="font-manrope text-white font-bold text-sm">
                                    Запрос успешно отправлен!
                                </h1>
                                <p className="font-manrope text-white/80 text-xs font-medium">
                                    Проверьте почту для подтверждения. Если письма нет — загляните в
                                    папку &quot;Спам&quot;.
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            } else {
                toast.custom(() => (
                    <div className="bg-[#262833] p-3 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <XIcon size={24} color="#FFFFFF" weight="light" />
                            <div>
                                <h1 className="font-manrope text-white font-bold text-sm">
                                    Произошла ошибка при отправке
                                </h1>
                                <p className="font-manrope text-white/80 text-xs font-medium">
                                    Обратитесь в тех.поддержку для уточнения!
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            }
        } catch (error) {
            toast.custom(() => (
                <div className="bg-[#262833] p-3 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <XIcon size={24} color="#FFFFFF" weight="light" />
                        <div>
                            <h1 className="font-manrope text-white font-bold text-sm">
                                Произошла ошибка при отправке
                            </h1>
                            <p className="font-manrope text-white/80 text-xs font-medium">
                                Обратитесь в тех.поддержку для уточнения!
                            </p>
                        </div>
                    </div>
                </div>
            ))
        }
    }

    return (
        <>
            <Toaster />
            <div className="flex flex-col items-center relative">
                <div className="flex flex-col gap-y-5 min-w-sm">
                    <h1 className="font-bold text-xl text-black dark:text-gray-300">
                        Привяжите аккаунт к почте
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="relative">
                            <div className="absolute top-5 left-5">
                                <Image src={letterIcon} alt="email-icon" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                disabled={isVerified}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Привязать почту"
                                className="w-full bg-[#D9DCED] rounded-2xl font-bold py-5 px-12 outline-none dark:text-white dark:placeholder:text-[#A1A1A3] dark:focus:bg-[#262833] transition-all dark:bg-transparent dark:border border-[#262833] disabled:opacity-50"
                            />
                            {!isEmailValid(email) ? (
                                <div className="absolute top-5.5 right-4">
                                    <Image src={penIcon} alt="pen-icon" />
                                </div>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={isVerified}
                                    className="absolute top-5 right-4 bg-black text-white text-xs px-4 py-1.5 rounded-xl dark:bg-white dark:text-black transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Отправить
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
