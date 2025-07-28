'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { FC, useEffect, useState } from 'react'

import { navItems } from '../Sidebar'
import { MobileSidebarProps } from './MobileSidebar.types'

export const MobileSidebar: FC<MobileSidebarProps> = (props) => {
    const {} = props
    const pathname = usePathname()
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        let lastScrollY = window.scrollY

        const handleScroll = () => {
            const currentScrollY = window.scrollY
            const viewportHeight = window.innerHeight
            const fullHeight = document.body.scrollHeight

            const isAtBottom = currentScrollY + viewportHeight >= fullHeight - 5

            if (isAtBottom && !pathname.includes('/account')) {
                setVisible(false)
            } else if (
                currentScrollY > lastScrollY &&
                currentScrollY > 0 &&
                !pathname.includes('/account')
            ) {
                setVisible(false)
            } else if (currentScrollY < lastScrollY && !pathname.includes('/account')) {
                setVisible(true)
            } else {
                setVisible(true)
            }

            lastScrollY = currentScrollY
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [pathname])

    if (['/auth/login', '/auth/register'].includes(pathname)) return

    return (
        <nav
            className={`fixed bottom-2 z-40 w-full px-2 md:hidden transition-transform duration-300 ${
                visible ? 'translate-y-0' : 'translate-y-50'
            }`}
            aria-label="Основная навигация"
        >
            <ul className="flex gap-6 items-center w-full bg-white rounded-xl p-2 dark:bg-[#282A35]">
                {navItems.map(({ label, icon, href }) => (
                    <li key={label} className="w-full flex justify-center">
                        <Link
                            href={href}
                            className={`flex flex-col items-center text-xs text-black w-full py-3 transition cursor-pointer hover:text-black/50 dark:text-gray-400 dark:hover:text-white/50 ${
                                pathname === href
                                    ? 'rounded-xl bg-[#FDB933] text-white  dark:text-white'
                                    : undefined
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
