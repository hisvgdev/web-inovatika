import arrowRightIcon from '@/public/assets/icons/arrowRightIcon.svg'
import squareKey from '@/public/assets/icons/keySquareIcon.svg'
import letterIcon from '@/public/assets/icons/letterIcon.svg'
import penIcon from '@/public/assets/icons/penIcon.svg'
import Image from 'next/image'
import React, { FC } from 'react'

import { AccountIdProps } from './AccountId.types'

export const AccountId: FC<AccountIdProps> = (props) => {
    const { setContentType } = props
    return (
        <div className="flex flex-col items-center relative">
            <div className="flex flex-col gap-y-5 min-w-sm">
                <h1 className="font-bold text-xl text-black dark:text-gray-300">Ваш аккаунт ID</h1>
                <div className="flex flex-col gap-y-1.5">
                    <form>
                        <div className="relative">
                            <div className="absolute top-5 left-5">
                                <Image src={letterIcon} alt="pen-icon" />
                            </div>
                            <input
                                type="text"
                                placeholder="Привязать почту"
                                className="w-full bg-[#D9DCED] rounded-2xl font-bold py-5 px-14 outline-none dark:text-white dark:placeholder:text-[#A1A1A3] dark:focus:bg-[#262833] transition-all dark:bg-transparent dark:border dark:border-[#262833]"
                            />
                            <div className="absolute top-5.5 right-4">
                                <Image src={penIcon} alt="pen-icon" />
                            </div>
                        </div>
                    </form>
                    <button
                        type="button"
                        className="w-full bg-[#D9DCED] rounded-2xl py-5 text-white cursor-pointer dark:bg-[#262833]"
                        onClick={() => setContentType('changePasswordUser')}
                    >
                        <div className="flex items-center justify-between px-4">
                            <div className="flex items-center gap-x-4">
                                <div className="pl-1.5">
                                    <Image src={squareKey} alt="pen-icon" />
                                </div>
                                <span className="font-bold text-black dark:text-white">Пароль</span>
                            </div>
                            <Image src={arrowRightIcon} alt="arrow-right-icon" />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}
