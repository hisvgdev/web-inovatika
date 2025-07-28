'use client'

import { confirmEmailVerification } from '@/utils/api/users.api'
import { CheckIcon, XIcon } from '@phosphor-icons/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast, Toaster } from 'sonner'

export const ConfirmEmailModal = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const token = searchParams.get('token')

        if (token) {
            ;(async () => {
                try {
                    await confirmEmailVerification(token)

                    toast.custom((t) => (
                        <div className="bg-[#262833] p-4 rounded-2xl">
                            <div className="flex items-center gap-4">
                                <CheckIcon size={32} color="#FFFFFF" weight="light" />
                                <div className="text-left">
                                    <h1 className="font-manrope text-white font-bold text-sm">
                                        Вы успешно подтвердили свою почту
                                    </h1>
                                    <p className="font-manrope text-white/80 text-xs font-medium">
                                        Подождите немного и мы вас вернем на предыдущую страницу.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))

                    setIsError(false)

                    setTimeout(() => {
                        router.push('/account')
                    }, 2500)
                } catch (error) {
                    toast.custom((t) => (
                        <div className="bg-[#262833] p-4 rounded-2xl">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8">
                                    <XIcon size={24} color="#FFFFFF" weight="light" />
                                </div>
                                <div className="text-left">
                                    <h1 className="font-manrope text-white font-bold text-sm">
                                        Произошла тех.ошибка при подтверждении вашей почты
                                    </h1>
                                    <p className="font-manrope text-white/80 text-xs font-medium">
                                        Подождите немного и мы вас вернем на предыдущую страницу,
                                        попробуйте еще раз подтвердить или обратитесь в службу
                                        тех.поддержки.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                    setIsError(true)

                    // setTimeout(() => {
                    //     router.push('/')
                    // }, 2500)
                }
            })()
        } else {
            toast.custom((t) => (
                <div className="bg-[#262833] p-4 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8">
                            <XIcon size={24} color="#FFFFFF" weight="light" />
                        </div>
                        <div className="text-left">
                            <h1 className="font-manrope text-white font-bold text-sm">
                                Произошла тех.ошибка при подтверждении вашей почты
                            </h1>
                            <p className="font-manrope text-white/80 text-xs font-medium">
                                Подождите немного и мы вас вернем на предыдущую страницу, попробуйте
                                еще раз подтвердить или обратитесь в службу тех.поддержки.
                            </p>
                        </div>
                    </div>
                </div>
            ))
            setIsError(true)
            setTimeout(() => {
                router.push('/')
            }, 2500)
        }
    }, [searchParams, router])

    return (
        <div className="flex justify-center items-center h-screen text-center">
            <Toaster richColors />
            <p className="text-lg font-semibold text-black dark:text-white">
                {!isError ? 'Подтверждаем ваш email...' : 'Произошла ошибка'}
            </p>
        </div>
    )
}
