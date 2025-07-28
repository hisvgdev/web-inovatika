import { fetchLegalTariffs } from '@/utils/api/tariffs.api'
import React, { FC } from 'react'

import { PaymentTypeSelector } from '../PaymentTypeSelector/PaymentTypeSelector'
import { PaymentTypeSelectorSSRProps } from './PaymentTypeSelectorSSR.types'

export const PaymentTypeSelectorSSR: FC<PaymentTypeSelectorSSRProps> = async (props) => {
    const { legalTariffs } = props

    return <PaymentTypeSelector legalTariffs={legalTariffs} />
}
