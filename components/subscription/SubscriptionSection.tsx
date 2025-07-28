import { fetchAllTariffs, fetchLegalTariffs } from '@/utils/api/tariffs.api'
import React, { FC } from 'react'

import { CurrentPlan } from './CurrentPlan/CurrentPlan'
import { PaymentEmail } from './PaymentEmail/PaymentEmail'
import PaymentTypeSelectorSSR from './PaymentTypeSelectorSSR'
import { SubscriptionSectionProps } from './SubscriptionSection.types'
import SubscriptionSSR from './SubscriptionSSR'

export const SubscriptionSection: FC<SubscriptionSectionProps> = async () => {
    const [tariffs, legalTariffs] = await Promise.all([fetchAllTariffs(), fetchLegalTariffs()])

    if (!tariffs || !legalTariffs) return

    return (
        <section className="flex flex-col gap-4 w-full px-8 md:gap-12 md:px-0 md:w-min md:min-w-3xl">
            <CurrentPlan tariffs={tariffs} />
            <SubscriptionSSR tariffs={tariffs} />
            <PaymentTypeSelectorSSR legalTariffs={legalTariffs} />
            <PaymentEmail tariffs={tariffs} />
        </section>
    )
}
