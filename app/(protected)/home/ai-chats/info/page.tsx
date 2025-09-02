'use client'

import { ArrowLeftIcon } from '@phosphor-icons/react'
import Link from 'next/link'

export default function AiChatsInfo() {
    return (
        <div className="flex flex-col gap-8 pt-8">
            <div className="flex items-start justify-start flex-col gap-y-6 max-w-6xl mx-auto px-4 md:px-0">
                <Link href="/home/ai-chats" className="flex items-center gap-2">
                    <ArrowLeftIcon color={'#939499'} />
                    <span className="text-black dark:text-white">Вернуться назад</span>
                </Link>
                <div className="flex flex-col gap-4 ">
                    <h1 className="font-manrope font-bold text-xl text-black dark:text-white">
                        Информация о режимах работы
                    </h1>
                    <p className="font-manrope text-sm text-black dark:text-white/70">
                        <strong>Кнопка &quot;Интернет&quot;</strong>
                    </p>
                    <p className="font-medium text-sm text-black dark:text-white/70">
                        Кнопка &quot;Интернет&quot; (расположена справа от кнопки с вопросом)
                        позволяет включать и выключать режим поиска в интернете.
                    </p>

                    <p className="font-medium text-sm text-black dark:text-white/70">
                        <strong>Режимы работы:</strong>
                    </p>
                    <ul className="list-disc list-inside pl-4 space-y-2 font-medium text-sm text-black dark:text-white/70">
                        <li>
                            <span className="font-medium text-sm text-black dark:text-white/70">
                                Без интернета (❌)
                            </span>{' '}
                            — позволяет получить более структурированную и подробную информацию на
                            основе базы знаний ИИ ЖКХ.
                        </li>
                        <li>
                            <span className="font-medium text-sm text-black dark:text-white/70">
                                C интернетом (✅)
                            </span>{' '}
                            — помогает найти актуальную информацию с использованием поиска в
                            интернете и получить наиболее свежие данные.
                        </li>
                    </ul>

                    <p className="font-medium text-sm text-black dark:text-white/70">
                        <strong>Выбирайте режим в зависимости от типа вашего вопроса:</strong>
                    </p>
                    <ul className="list-disc list-inside pl-4 space-y-2 font-medium text-sm text-black dark:text-white/70">
                        <li>Для общих вопросов о ЖКХ используйте режим без интернета</li>
                        <li>
                            Поиск актуальной информации о законах, тарифах и новостях — используйте
                            режим с интернетом
                        </li>
                    </ul>

                    <p className="font-medium text-sm text-black dark:text-white/70">
                        <strong>Типы агентов (кнопка 👤)</strong>
                    </p>
                    <p className="font-medium text-sm text-black dark:text-white/70">
                        Выбор типа агента влияет на качество ответа в зависимости от тематики вашего
                        вопроса. Каждый агент специализируется на определённой области ЖКХ:
                    </p>
                    <ul className="list-disc list-inside pl-4 space-y-2 font-medium text-sm text-black dark:text-white/70">
                        <li>
                            Вопросы без специализации — универсальный агент для общих вопросов о
                            ЖКХ.
                        </li>
                        <li>
                            Руководство и управление — специалист по вопросам управления МКД, работе
                            с УК, ТСЖ, собраниям собственников и управленческим решениям.
                        </li>
                        <li>
                            Производственно-технические вопросы — инженер по системам, ремонту,
                            обслуживанию оборудования и документации.
                        </li>
                        <li>
                            Финансы и бухгалтерия — специалист по тарифам, платежам, субсидиям и
                            другим финансовым вопросам.
                        </li>
                        <li>
                            Юридическая работа — юрист по ЖКХ, судебной практике, правам
                            собственников и документам.
                        </li>
                        <li>
                            Работа с населением — эксперт по коммуникации с жителями, обращениям,
                            жалобам и конфликтам.
                        </li>
                    </ul>

                    <p className="font-medium text-sm text-black dark:text-white/70">
                        <strong>Важно:</strong>
                    </p>
                    <p className="font-medium text-sm text-black dark:text-white/70">
                        Выбор правильного типа агента значительно повышает точность и полноту ответа
                        по вашему вопросу.
                    </p>

                    <p className="font-medium text-sm text-black dark:text-white/70">
                        <strong>Кнопка &quot;Очистить историю переписки&quot; 🗑️</strong>
                    </p>
                    <p className="font-medium text-sm text-black dark:text-white/70">
                        Кнопка расположена в верхней части экрана и позволяет полностью удалить
                        историю общения с ИИ ЖКХ.
                    </p>

                    <p className="font-medium text-sm text-black dark:text-white/70">
                        <strong>Для чего это нужно:</strong>
                    </p>
                    <ul className="list-disc list-inside pl-4 space-y-2 font-medium text-sm text-black dark:text-white/70">
                        <li>Начать новую беседу с чистого листа</li>
                        <li>Удалить устаревшие или неактуальные вопросы и ответы</li>
                        <li>Улучшить производительность, если переписка стала слишком длинной</li>
                    </ul>

                    <p className="font-medium text-sm text-black dark:text-white/70">
                        <strong>Важно:</strong>
                    </p>
                    <p className="font-medium text-sm text-black dark:text-white/70">
                        При нажатии на эту кнопку история вашей переписки с ИИ будет безвозвратно
                        удалена. Перед очисткой вам будет предложено подтвердить это действие.
                    </p>
                </div>
            </div>
        </div>
    )
}
