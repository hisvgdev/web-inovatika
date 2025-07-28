import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const res = await fetch('https://botcalendary.ru/api/v1/users/verify/email/send', {
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
        { error: data || "Ошибка при отправке письма" },
        { status: res.status }
      )
    }

    const response = NextResponse.json({ status: 'ok', data })

    return response
  } catch (error) {
    console.error('Ошибка в email-verify:', error)
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 })
  }
}
