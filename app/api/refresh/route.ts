import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const access_token = req.cookies.get('access_token')?.value
  const refresh_token = req.cookies.get('refresh_token')?.value

  if (!access_token || !refresh_token) {
    return NextResponse.json({ error: 'Нет токенов' }, { status: 401 })
  }

  const res = await fetch('https://botcalendary.ru/api/v1/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ access_token, refresh_token }),
    cache: 'no-store',
  })

  const data = await res.json()

  if (!res.ok) {
    return NextResponse.json({ error: 'Не удалось обновить' }, { status: 401 })
  }

  const response = NextResponse.json({ status: 'refreshed' })

  response.cookies.set('access_token', data.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 60 * 15,
    path: '/',
  })

  response.cookies.set('refresh_token', data.refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  return response
}
