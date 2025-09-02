import { commonQuestions } from '@/utils/api/chats.api'
import { cookies } from 'next/headers'
import React from 'react'

import { AiChatsConnection } from '../../AiChatsConnection'

export const AiChatsGrid = async () => {
    const cookieStore = await cookies()
    const cmnQuestion = await commonQuestions()
    const accessToken = cookieStore.get('access_token')?.value

    if (!accessToken) return null

    return <AiChatsConnection questions={cmnQuestion.questions || []} token={accessToken} />
}
