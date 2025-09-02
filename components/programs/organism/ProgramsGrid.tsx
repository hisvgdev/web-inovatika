import Link from 'next/link'
import React, { FC } from 'react'

import Infostructure from '../molecules/Infostructure'
import Services from '../molecules/Services'
import { ProgramsGridProps } from './ProgramsGrid.types'

export const ProgramsGrid: FC<ProgramsGridProps> = async (props) => {
    const {} = props
    return (
        <div className="flex items-center justify-center flex-col gap-y-6 max-w-5xl mx-auto h-full">
            <div className="grid grid-cols-1  items-center justify-center gap-8 max-w-96 md:max-h-96 md:overflow-y-auto md:grid-cols-2 md:max-w-full md:flex-row">
                <Infostructure />
                <Services />
            </div>
            <Link
                href="/about-service"
                className="w-96 flex justify-center py-5 rounded-2xl font-semibold bg-[#FDB933] text-black hover:bg-[#FDB933]/90 transition-all md:w-full md:max-w-md"
            >
                Чем полезны эти сервисы?
            </Link>
        </div>
    )
}
