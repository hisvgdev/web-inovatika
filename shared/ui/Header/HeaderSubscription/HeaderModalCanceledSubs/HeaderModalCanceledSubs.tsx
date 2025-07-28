import { Button } from '@/components/ui/Button/Button'
import { disableSubscription } from '@/utils/api/subscriptions.api'
import { CheckIcon, XIcon } from '@phosphor-icons/react'
import React from 'react'
import { toast, Toaster } from 'sonner'

export const HeaderModalCanceledSubs = ({ handleClose }: { handleClose: () => void }) => {
    const handleDisableSubs = async () => {
        try {
            const res = await disableSubscription()
            if (res) {
                localStorage.removeItem('me')
                setTimeout(() => {
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
                                        Ваша подписка была отменена!
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                }, 0)
            } else {
                toast.custom(() => (
                    <div className="bg-[#262833] p-3 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8">
                                <XIcon size={24} color="#FFFFFF" weight="light" />
                            </div>
                            <div>
                                <h1 className="font-manrope text-white font-bold text-sm">
                                    Произошла ошибка!
                                </h1>
                                <p className="font-manrope text-white/80 text-xs font-medium">
                                    Пожалуйста обратитесь в тех.поддержку для уточнения вашей
                                    проблемы
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
                        <div className="w-8 h-8">
                            <XIcon size={24} color="#FFFFFF" weight="light" />
                        </div>
                        <div>
                            <h1 className="font-manrope text-white font-bold text-sm">
                                Произошла ошибка!
                            </h1>
                            <p className="font-manrope text-white/80 text-xs font-medium">
                                Пожалуйста обратитесь в тех.поддержку для уточнения вашей проблемы
                            </p>
                        </div>
                    </div>
                </div>
            ))
        }
    }
    return (
        <div className="absolute inset-0 h-dvh w-screen bg-black/20 z-40">
            <Toaster />
            <div className="h-full flex items-center justify-center">
                <div className="px-4 py-8 bg-white rounded-2xl min-w-96 dark:bg-[#262833]">
                    <div className="flex flex-col gap-y-6">
                        <div className="w-full flex justify-end">
                            <button type="button" className="cursor-pointer" onClick={handleClose}>
                                <XIcon size={24} color="#51535C" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-4 justify-center items-center">
                            <h4 className="text-black text-xl max-w-96 text-center dark:text-white">
                                Вы действительно хотите отменить автопродление подписки?
                            </h4>
                            <Button className="w-full" onClick={handleDisableSubs}>
                                Отменить
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
