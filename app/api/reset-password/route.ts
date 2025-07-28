import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const res = await fetch('https://botcalendary.ru/api/v1/auth/password/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: req.headers.get('cookie') || '',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.message || 'Ошибка при изменении пароля' },
        { status: res.status }
      )
    }

    return NextResponse.json({ status: 'ok', data })
  } catch (error) {
    console.error('Ошибка сервера в password-reset:', error)
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 })
  }
}
