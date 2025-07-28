'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { ErrorPageProps } from '@/types/page.types'

export default function Error({ error, reset }: ErrorPageProps) {
    // const router = useRouter()

    useEffect(() => {
        console.error('Error from SSR', error)
        // router.push('/auth/login')
    }, [])

    return (
        <main className="grid min-h-full place-items-center bg-transparent px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-200 sm:text-5xl">
                    Неизвестная ошибка
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-500">
                    Что-то пошло не так. Если вы считаете что это ошибка, пожалуйста свяжитесь с
                    поддержкой
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <button
                        type="button"
                        onClick={reset}
                        className="text-black bg-[#FDB933] w-full py-4 rounded-2xl cursor-pointer max-w-sm"
                    >
                        Повторить
                    </button>
                </div>
            </div>
        </main>
    )
}
