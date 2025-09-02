'use client'

import { navItems } from '@/constants/nav.constants'
import logo from '@/public/assets/icons/logo.svg'
import logoWhite from '@/public/assets/icons/logoWhite.svg'
import { ListIcon } from '@phosphor-icons/react'
import { useAtom, useSetAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { FC } from 'react'

import { burgetAtom } from '@/lib/atom/burger.atom'

import { ThemeSwitch } from '../ThemeSwitch/ThemeSwitch'
import { HeaderProps } from './Header.types'
import HeaderSubscription from './HeaderSubscription'

export const Header: FC<HeaderProps> = (props) => {
    const {} = props
    const pathname = usePathname()
    const router = useRouter()
    const [isBurgerActive, setIsBurgerActive] = useAtom(burgetAtom)
    const handleRedirect = (href: string) => {
        router.push(href)
        setIsBurgerActive(!isBurgerActive)
    }
    return (
        <header>
            <div className="flex items-center justify-between pt-7 px-4 lg:pb-0 lg:py-7">
                <div className="flex items-center gap-8">
                    <div className="flex-2/3">
                        <Link href="/">
                            <div className="hidden dark:block">
                                <Image src={logoWhite} alt="logo" />
                            </div>
                            <div className="dark:hidden">
                                <Image src={logo} alt="logo" />
                            </div>
                        </Link>
                    </div>
                    <ul className="hidden lg:flex gap-6 items-center w-full rounded-xl dark:bg-transparent">
                        {navItems.map(({ label, icon, href }) => (
                            <li key={label} className="w-full flex justify-center">
                                <Link
                                    href={href}
                                    className={`flex gap-3 items-center text-sm text-black w-full p-3 transition cursor-pointer hover:text-black/50 dark:text-white dark:hover:text-white/50 ${
                                        pathname === href
                                            ? 'text-white rounded-xl bg-[#FDB933] dark:bg-[#2B2C31]'
                                            : ''
                                    }`}
                                    aria-current={pathname === href ? 'page' : undefined}
                                >
                                    <div className="text-xl">{icon}</div>
                                    <span className="whitespace-nowrap">{label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex items-center gap-x-3">
                    <ThemeSwitch />
                    <div className="block lg:hidden">
                        <button
                            type="button"
                            className="text-[#FDB933] font-bold text-sm"
                            onClick={() => setIsBurgerActive(!isBurgerActive)}
                        >
                            <ListIcon size={32} color="#FDB933" />
                        </button>
                    </div>
                </div>
            </div>
            {isBurgerActive && (
                <div className="absolute top-0 z-50 h-screen w-full flex items-center justify-center backdrop-blur-xl">
                    <button
                        type="button"
                        onClick={() => setIsBurgerActive(false)}
                        className="absolute top-8 right-1 text-4xl text-white dark:text-white hover:text-black/50 dark:hover:text-white/50 transition bg-[#404455] rounded-full px-5 py-2"
                        aria-label="Закрыть меню"
                    >
                        &times;
                    </button>

                    <div className="flex flex-col gap-8">
                        <HeaderSubscription />
                        {navItems.map(({ label, icon, href }) => (
                            <li key={label} className="w-full flex justify-center">
                                <button
                                    type="button"
                                    onClick={() => handleRedirect(href)}
                                    className={`flex items-center gap-3 text-black w-fit p-3 transition cursor-pointer hover:text-black/50 dark:text-gray-400 dark:hover:text-white/50 ${
                                        pathname === href
                                            ? 'rounded-xl bg-[#FDB933] text-white dark:text-white'
                                            : 'bg-[#404455] rounded-xl text-black dark:text-black'
                                    }`}
                                    aria-current={pathname === href ? 'page' : undefined}
                                >
                                    <div className="text-2xl text-white">{icon}</div>
                                    <span className="text-md text-white font-medium dark:text-white">
                                        {label}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </div>
                </div>
            )}
        </header>
    )
}
