import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const res = await fetch(`https://botcalendary.ru/api/v1/chats/active`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: req.headers.get('cookie') || '',
      },
      credentials: 'include',
      cache: 'no-store',
    })

    const data = await res.json()

    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    console.error('Ошибка при запросе внешнего API:', error)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
