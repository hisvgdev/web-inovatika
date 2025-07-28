'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

import { ServiceCardProps } from './ServiceCard.types'

export const ServiceCard: FC<ServiceCardProps> = (props) => {
    const { icon, title, href, description, disabled = false } = props
    const router = useRouter()
    const handlePushRoute = () => router.push(href)
    return (
        <button
            type="button"
            disabled={disabled}
            className="flex text-left items-center bg-white gap-x-6 rounded-2xl p-6 w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 hover:bg-white/50 dark:bg-[#262833] dark:disabled:bg-[#262833]/50"
            onClick={handlePushRoute}
        >
            <Image src={icon} alt="icon" className="min-w-20" />
            <div className="flex flex-col">
                <h1 className="font-bold text-sm text-black dark:text-gray-300">{title}</h1>
                <p className="text-gray-500 text-sm font-medium dark:text-gray-400">
                    {description}
                </p>
            </div>
        </button>
    )
}
