import React, { FC } from 'react'

import SubscriptionPlan from './SubscriptionPlan'
import { SubscriptionSSRProps } from './SubscriptionSSR.types'

export const SubscriptionSSR: FC<SubscriptionSSRProps> = async (props) => {
    const { tariffs } = props

    return <SubscriptionPlan tariffs={tariffs} />
}
