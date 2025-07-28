import Link from 'next/link'
import React, { FC } from 'react'

import Infostructure from '../molecules/Infostructure'
import Services from '../molecules/Services'
import { ProgramsGridProps } from './ProgramsGrid.types'

export const ProgramsGrid: FC<ProgramsGridProps> = async (props) => {
    const {} = props
    return (
        <div className="flex items-center justify-center flex-col gap-y-6 max-w-4xl mx-auto h-full lg:h-[80vh]">
            <div className="flex flex-col items-center justify-center gap-x-12 max-w-96 md:max-w-full md:flex-row">
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
