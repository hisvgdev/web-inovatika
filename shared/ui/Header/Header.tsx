'use client'

import logo from '@/public/assets/icons/logo.svg'
import logoWhite from '@/public/assets/icons/logoWhite.svg'
import Image from 'next/image'
import React, { FC } from 'react'

import { ThemeSwitch } from '../ThemeSwitch/ThemeSwitch'
import { HeaderProps } from './Header.types'
import HeaderSubscription from './HeaderSubscription'

export const Header: FC<HeaderProps> = (props) => {
    const {} = props
    // const pathname = usePathname()
    // const isMobile = useIsMobile()
    // if (
    //     isMobile &&
    //     ['/programs/ai-chats', '/programs/ai-chats/info', '/programs/check-conter-agent'].includes(
    //         pathname,
    //     )
    // )
    //     return null
    return (
        <header>
            <div className="flex items-center justify-between pt-7 px-4 lg:pb-0 lg:py-7">
                <div className="hidden dark:block">
                    <Image src={logoWhite} alt="logo" />
                </div>
                <div className="dark:hidden">
                    <Image src={logo} alt="logo" />
                </div>
                <div className="flex items-center gap-x-3">
                    <ThemeSwitch />
                    <HeaderSubscription />
                </div>
            </div>
        </header>
    )
}
