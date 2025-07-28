import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const segments = url.pathname.split('/')
    const user_id = segments[segments.length - 1]

    const cookie = req.headers.get('cookie') || ''
    const { tg_id } = await req.json()

    const response = await fetch(`https://botcalendary.ru/api/v1/users/${user_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookie,
      },
      body: JSON.stringify({ tg_id }),
    })

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
