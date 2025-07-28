'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, JSX, useEffect, useState } from 'react'
import { FaInfoCircle, FaShoppingBag, FaTv, FaUser } from 'react-icons/fa'

import { SidebarProps } from './Sidebar.types'

interface NavItem {
    label: string
    icon: JSX.Element
    active?: boolean
    href: string
}

export const navItems: NavItem[] = [
    { label: 'Программы', icon: <FaTv />, href: '/programs' },
    { label: 'О сервисе', icon: <FaInfoCircle />, href: '/about-service' },
    { label: 'Подписка', icon: <FaShoppingBag />, href: '/subscription' },
    { label: 'Аккаунт', icon: <FaUser />, href: '/account' },
]

export const Sidebar: FC<SidebarProps> = (props) => {
    const {} = props
    const pathname = usePathname()

    if (['/auth/login', '/auth/register'].includes(pathname)) return

    return (
        <nav
            className="hidden md:absolute md:top-80 md:flex md:flex-col md:items-center md:justify-center md:w-20 md:py-6 md:ml-4"
            aria-label="Основная навигация"
        >
            <ul className="flex flex-col gap-6 items-center w-full bg-white rounded-xl z-40 dark:bg-transparent dark:border border-[#1F2025]">
                {navItems.map(({ label, icon, href }) => (
                    <li key={label} className="w-full flex justify-center">
                        <Link
                            href={href}
                            className={`flex flex-col items-center text-xs text-black w-full py-3 transition cursor-pointer hover:text-black/50 dark:text-white dark:hover:text-white/50 ${
                                pathname === href
                                    ? 'text-white rounded-xl bg-[#FDB933] dark:bg-[#2B2C31]'
                                    : ''
                            }`}
                            aria-current={pathname === href ? 'page' : undefined}
                        >
                            <div className="text-2xl">{icon}</div>
                            <span className="mt-1">{label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Sidebar
