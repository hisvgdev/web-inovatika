import { Manrope } from 'next/font/google'

import type { Metadata } from 'next'

import '../styles/globals.css'

import Header from '@/shared/ui/Header'
import Sidebar from '@/shared/ui/Sidebar'
import MobileSidebar from '@/shared/ui/Sidebar/MobileSidebar'
import Script from 'next/script'

import { TelegramLayout } from './TelegramLayout'

const manrope = Manrope({
    variable: '--font-manrope',
    subsets: ['latin'],
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Инноватика',
    description:
        '20-летняя практика по развитию отраслевых объектов и предприятий. Работаем с юридическими, экономическими и производственными задачами.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="ru" suppressHydrationWarning>
            <body className={`${manrope.variable} antialiased `}>
                <Script
                    src="https://telegram.org/js/telegram-web-app.js"
                    strategy="beforeInteractive"
                />
                <TelegramLayout>{children}</TelegramLayout>
            </body>
        </html>
    )
}
