'use client'

import { useTheme } from '@/hooks/useTheme'
import { CloudMoonIcon, SunDimIcon } from '@phosphor-icons/react'

export const ThemeSwitch = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            className="hidden sm:flex justify-between items-center bg-[#262833] rounded-full p-1 relative w-24 h-10 transition-colors duration-300 cursor-pointer"
        >
            <div
                className={`absolute top-0.5  w-10 h-9 rounded-full bg-[#FDB933] transition-transform duration-300 ${
                    theme === 'light' ? 'translate-x-[38px] left-[1rem]' : ' left-[0.2rem]'
                }`}
            />
            <CloudMoonIcon
                weight="duotone"
                className={`relative z-10 text-white w-5 h-5 mx-2 ${
                    theme === 'dark' ? 'opacity-100' : 'opacity-40'
                }`}
            />
            <SunDimIcon
                weight="duotone"
                className={`relative z-10 text-white w-5 h-5 mx-2 ${
                    theme === 'light' ? 'opacity-100' : 'opacity-40'
                }`}
            />
        </button>
    )
}
