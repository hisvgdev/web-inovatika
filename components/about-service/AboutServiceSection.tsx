'use client'

import { Button } from '@/components/ui/Button/Button'
import AIIcon from '@/public/assets/icons/AIZKHIcon.png'
import blackArrowRightIcon from '@/public/assets/icons/blackArrowRightIcon.svg'
import checkOfAgentIcon from '@/public/assets/icons/checkOfAgent.png'
import daidjestIcon from '@/public/assets/icons/daidjestIcon.png'
import clsx from 'clsx'
import Image, { StaticImageData } from 'next/image'
import React, { FC, useState } from 'react'

import { AboutServiceSectionProps } from './AboutServiceSection.types'

type ActionType = 'agent' | 'ai' | 'daidjest'

const cards: {
    id: ActionType
    icon: StaticImageData
    title: string
    desc: string
}[] = [
    {
        id: 'agent',
        icon: checkOfAgentIcon,
        title: 'Полная информация о функционале сервиса',
        desc: 'Этот сервис позволит получить вам актуальную справку с информацией о контрагенте',
    },
    {
        id: 'ai',
        icon: AIIcon,
        title: 'Искусственный Интеллект ЖКХ (ИИ ЖКХ)',
        desc: 'Интеллектуальный помощник на базе максимальных платных версий нейросетей, а также умный поиск в сети интернет.',
    },
    {
        id: 'daidjest',
        icon: daidjestIcon,
        title: 'Канал "Дайджест ПРОфи ЖКХ"',
        desc: '11 госорганов, 29 экспертов, 42 СМИ новости кратко + первоисточники',
    },
]

export const AboutServiceSection: FC<AboutServiceSectionProps> = () => {
    const [actionType, setActionType] = useState<ActionType | null>(null)

    const renderSelectedContent = () => {
        switch (actionType) {
            case 'agent':
                return (
                    <div className="text-left text-black space-y-4 text-sm leading-relaxed dark:text-gray-300">
                        <h2 className="text-xl font-bold">Проверка контрагентов</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Проверка контрагентов</strong> — это важно при любых
                            взаимоотношениях и платежах. Она помогает вам избежать ненужных рисков и
                            убедиться, что вы работаете с надёжными партнёрами.
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>1. Финансовая стабильность:</strong> Проверяя контрагента, вы
                            можете оценить его платёжеспособность и финансовое состояние. Это
                            снижает риск того, что вам не заплатят.
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>2. Юридическая чистота:</strong> Вы узнаете, есть ли у
                            контрагента какие-то судебные проблемы, которые могут повлиять на ваше
                            сотрудничество.
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>3. Доверие и надёжность:</strong> Проверка помогает установить
                            доверие и убедиться, что вы работаете с надёжным партнёром.
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>4. Соблюдение законов:</strong> Это также необходимо для того,
                            чтобы следовать правилам по борьбе с отмыванием денег и финансированием
                            терроризма.
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            С точки зрения закона, важно проявлять должную осмотрительность при
                            выборе контрагентов. Это означает, что вы должны быть разумно осторожны,
                            чтобы избежать проблем с налоговыми органами и минимизировать риски.{' '}
                            <strong>
                                Об этом говорится в Постановлении Пленума ВАС РФ от 12 октября 2006
                                года № 53.
                            </strong>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Кроме того, статья 10 Гражданского кодекса РФ подчёркивает важность
                            добросовестности и разумности в деловых отношениях.
                        </p>
                    </div>
                )
            case 'ai':
                return (
                    <div className="text-left text-black space-y-4 text-sm leading-relaxed dark:text-gray-300">
                        <h2 className="text-xl font-bold">Искусственный Интеллект ЖКХ (ИИ ЖКХ)</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Искусственный Интеллект ЖКХ</strong> — это специализированная
                            нейросеть, настроенная на работу именно с вопросами
                            жилищно-коммунального хозяйства России.
                        </p>
                        <ul className="flex flex-col gap-y-4">
                            <li className="text-sm text-gray-600 dark:text-gray-400 list-disc ml-4">
                                специально построена на базе самых последних платных моделей лидеров
                                мировых нейросетей.
                            </li>
                            <li className="text-sm text-gray-600 dark:text-gray-400 list-disc ml-4">
                                интеллектуальный поиск в сети интернет, используя современные
                                нейросетевые технологии.
                            </li>
                            <li className="text-sm text-gray-600 dark:text-gray-400 list-disc ml-4">
                                ИИ ЖКХ – постоянно развивающаяся и совершенствующаяся система, с
                                доступом к узкоспециализированной, отраслевой информации в вопросах
                                ЖКХ, строительства и городской среды.
                            </li>
                        </ul>
                        <h4 className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Кому будет полезен этот сервис?</strong>
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Руководителям предприятий</strong> - тем, кто принимает
                            управленческие и владельческие решения – директора Управляющих
                            Организаций, ТСЖ, ТСН, РСО и сотрудники Органов власти. Помощь
                            руководителям предприятий и отрасли в текущих вопросах работы,
                            стратегическом планировании, мониторинге состояния как предприятий, так
                            и жилищного фонда, кадровых процессах.
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Техническим специалистам</strong> - в решении производственных и
                            технических вопросов. Главный инженер, любой сотрудник
                            производственно-технического отдела, сметчик, рядовой слесарь или
                            электрик – все они найдут здесь свою специализированную информацию.
                            Технологии производства ремонтных работ, контроль состояния инженерных
                            сетей, технологии содержания МКД и энергосбережение.
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Финансистам</strong> - экономистам, бухгалтерам – всем,
                            связанным с финансовым планированием деятельности, бухгалтерским учетом,
                            аудитом, расчётом тарифов, формированием смет и бюджетированием.
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Юристам</strong> - максимальный функционал для анализа
                            юридической информации, составления проектов документов и поиска
                            аналитики в правовых аспектах ЖКХ.
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Специалистам по работе с населением</strong> - информация для
                            эффективного взаимодействия с жителями. Содержит контент по вопросам
                            коммуникации с жителями многоквартирных домов. Повышение их лояльности,
                            проведение встреч, общих собраний собственников жилья, повышение
                            удовлетворённости на базе всех технологий PR, GR и маркетинга, Public
                            Relations и Government Relations, инструментов пропаганды и социальной
                            психологии. Анализ обращений, генерация ответов, автоматизация
                            взаимодействия с жителями.
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Помимо специализированных задач, ИИ ЖКХ успешно справляется с широким
                            спектром других вопросов, а также обладает функцией интеллектуального
                            поиска в интернете, используя современные нейросетевые технологии.
                        </p>
                    </div>
                )
            case 'daidjest':
                return (
                    <div className="text-left text-black space-y-4 text-sm leading-relaxed dark:text-gray-300">
                        <h2 className="text-xl font-bold">Канал &quot;Дайджест ПРОфи ЖКХ&quot;</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Канал &quot;Дайджест ПРОфи ЖКХ&quot;</strong> — это
                            профессиональная подборка новостей и аналитики для специалистов в сфере
                            ЖКХ.
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            На канале публикуются самые актуальные новости и события от:
                        </p>
                        <ul className="flex flex-col gap-y-4">
                            <li className="text-sm text-gray-600 dark:text-gray-400 list-disc ml-4">
                                11 государственных органов
                            </li>
                            <li className="text-sm text-gray-600 dark:text-gray-400 list-disc ml-4">
                                29 ведущих экспертов отрасли
                            </li>
                            <li className="text-sm text-gray-600 dark:text-gray-400 list-disc ml-4">
                                42 специализированных СМИ
                            </li>
                        </ul>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Вся информация представлена в компактном и удобном для восприятия
                            формате с обязательными ссылками на первоисточники.
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Наш дайджест позволяет специалистам оставаться в курсе всех важных
                            изменений и тенденций отрасли, экономя при этом время на самостоятельный
                            поиск и анализ информации
                        </p>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="flex flex-col items-center justify-center gap-12 lg:h-[70vh]">
            <div className="flex flex-col gap-y-5">
                {actionType !== 'agent' && actionType !== 'ai' && actionType !== 'daidjest' && (
                    <h1 className="font-bold text-black text-xl text-left pl-6 max-w-64 dark:text-gray-300 md:text-center md:pl-0 md:max-w-full">
                        Полная информация о функционале сервиса
                    </h1>
                )}

                {actionType === null ? (
                    <div className="flex flex-col items-stretch gap-6 max-w-6xl px-6 md:px-0 md:flex-row">
                        {cards.map(({ icon, title, desc, id }, idx) => (
                            <div key={idx} className="flex flex-col gap-y-1.5 w-full">
                                <div className="flex items-center gap-x-6 bg-white rounded-2xl p-6 h-full dark:bg-[#262833]">
                                    <Image src={icon} alt="icon" className="min-w-20" />
                                    <div className="flex flex-col">
                                        <h1 className="font-bold text-black text-sm dark:text-gray-300">
                                            {title}
                                        </h1>
                                        <p className="text-gray-600 text-sm font-medium dark:text-gray-400">
                                            {desc}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    className="flex justify-center items-center gap-x-5"
                                    onClick={() => setActionType(id)}
                                >
                                    <span className="font-semibold text-[#262833] text-sm">
                                        Продолжить
                                    </span>
                                    <Image src={blackArrowRightIcon} alt="arrow-right" />
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div
                        className={clsx(
                            'text-gray-300 px-4 flex flex-col items-start gap-6',
                            actionType !== 'agent' &&
                                actionType !== 'ai' &&
                                actionType !== 'daidjest'
                                ? 'max-w-3xl'
                                : 'max-w-6xl',
                        )}
                    >
                        {renderSelectedContent()}
                        <Button onClick={() => setActionType(null)}>Назад</Button>
                    </div>
                )}
            </div>
        </div>
    )
}
