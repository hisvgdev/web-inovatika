'use client'

export default function NotFound() {
    return (
        <main className="flex flex-col justify-center items-center min-h-screen bg-transparent px-6 py-24 sm:py-32 lg:px-8">
            <p className="text-8xl font-semibold text-gray-200">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-400 sm:text-5xl">
                Страница не найдена
            </h1>
            <p className="mt-6 text-base text-center leading-7 text-gray-400">
                Мы не смогли найти требуемую страницу 😔 <br />
                Если вы считаете что это ошибка, пожалуйста свяжитесь с поддержкой
            </p>
        </main>
    )
}
