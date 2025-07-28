import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const res = await fetch('https://botcalendary.ru/api/v1/chats/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: req.headers.get('cookie') || '',
      },
      body: JSON.stringify(body),
      credentials: 'include',
      cache: 'no-store',
    })

    const data = await res.json()

    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    console.error('Chats create Error:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
