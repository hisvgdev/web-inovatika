import daidjestIcon from '@/public/assets/icons/daidjestIcon.png'
import humanIcon from '@/public/assets/icons/humanIcon.png'
import { getInviteLinks } from '@/utils/api/subscriptions.api'
import React, { FC } from 'react'

import ServiceCard from '../../atoms/ServiceCard'
import { InfostructureProps } from './Infostructure.types'

export const Infostructure: FC<InfostructureProps> = async () => {
    const inviteLinks = await getInviteLinks()

    const links = Array.isArray(inviteLinks?.invite_links) ? inviteLinks.invite_links : []

    return (
        <div className="flex flex-col gap-y-5 w-full">
            <h1 className="text-black font-bold text-xl dark:text-white">Наши инфоресурсы</h1>
            <div className="flex flex-col gap-y-1.5">
                <ServiceCard
                    icon={daidjestIcon}
                    title="Канал “ДайджестПРОфи ЖКХ”"
                    description="11 госорганов, 29 экспертов, 42 СМИ новости кратко + первоисточники"
                    href={links[0] || ''}
                />

                <ServiceCard
                    icon={humanIcon}
                    title="Канал “А. Гурылев PRO ЖКХ”"
                    description="Канал жителям городов. ЖКХ не враг, а инструмент. Учитесь пользоваться"
                    href={links[1] || ''}
                />
            </div>
        </div>
    )
}
