'use client'

import ConfirmEmailModal from '@/components/confirm-email'
import { Suspense } from 'react'

export default function ConfirmEmailPage() {
    return (
        <Suspense>
            <ConfirmEmailModal />
        </Suspense>
    )
}
