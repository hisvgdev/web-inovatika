'use client'

import React, { FC, useState } from 'react'

import { PaymentTypeSelectorProps } from './PaymentTypeSelector.types'

export const PaymentTypeSelector: FC<PaymentTypeSelectorProps> = (props) => {
    const { legalTariffs } = props
    const [selectedType, setSelectedType] = useState<'individual' | 'legal'>('individual')

    const commonStyles =
        'py-9 px-5 rounded-2xl transition-all border w-full bg-white cursor-pointer dark:bg-[#262833]'

    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="font-bold text-black text-xl text-center dark:text-gray-300">
                Тип плательщика
            </h1>
            <div className="flex flex-col items-start sm:flex-row gap-3">
                {/* Individual */}
                <button
                    type="button"
                    onClick={() => setSelectedType('individual')}
                    className={`${commonStyles} ${
                        selectedType === 'individual' ? 'ring ring-[#FDB933]' : 'border-transparent'
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col text-left gap-y-0.5">
                            <h4 className="text-black font-bold text-sm dark:text-white">
                                Физическое лицо
                            </h4>
                            <p className="text-black font-medium text-sm dark:text-gray-400">
                                Оплата картой или через СБП
                            </p>
                        </div>
                        <input
                            type="radio"
                            checked={selectedType === 'individual'}
                            onChange={() => setSelectedType('individual')}
                            className="accent-[#FDB933] w-5 h-5"
                        />
                    </div>
                </button>

                {/* Legal */}
                <button
                    type="button"
                    onClick={() => setSelectedType('legal')}
                    className={`${commonStyles} ${
                        selectedType === 'legal' ? 'ring ring-[#FDB933]' : 'border-transparent'
                    } flex-col`}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-y-0.5 text-left">
                            <h4 className="text-black font-bold text-sm dark:text-white ">
                                Юридическое лицо
                            </h4>
                            <p className="text-black font-medium text-sm dark:text-gray-400">
                                Оплата по счету с НДС
                            </p>
                        </div>
                        <input
                            type="radio"
                            checked={selectedType === 'legal'}
                            onChange={() => setSelectedType('legal')}
                            className="accent-[#FDB933] w-5 h-5"
                        />
                    </div>

                    {selectedType === 'legal' && (
                        <div className="mt-8 w-full">
                            <h3 className="text-black font-bold text-md text-left mb-3 dark:text-white">
                                Ваши данные
                            </h3>
                            <div className="flex flex-col gap-y-3">
                                <input
                                    type="text"
                                    placeholder="ИНН"
                                    className="p-4 rounded-lg bg-[#D9DCED] text-white placeholder-gray-500 focus:outline-none focus:ring focus:ring-[#FDB933] dark:bg-[#13141A]"
                                />
                                <input
                                    type="text"
                                    placeholder="ОГРН"
                                    className="p-4 rounded-lg bg-[#D9DCED] text-white placeholder-gray-500 focus:outline-none focus:ring focus:ring-[#FDB933] dark:bg-[#13141A]"
                                />
                            </div>
                        </div>
                    )}
                </button>
            </div>
        </div>
    )
}
