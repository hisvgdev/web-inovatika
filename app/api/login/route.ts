import { THIRTY_MINUTES } from "@/constants/global.constants"
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const res = await fetch('https://botcalendary.ru/api/v1/auth/login/web', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  })

  const data = await res.json()

  if (!res.ok) {
    return NextResponse.json({ error: 'Ошибка авторизации' }, { status: 401 })
  }

  const response = NextResponse.json({ status: 'ok' })

  response.cookies.set('access_token', data.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: THIRTY_MINUTES,
    path: '/',
  })

  response.cookies.set('refresh_token', data.refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 604800, // 7 days
    path: '/',
  })

  return response
}
