import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {

  const res = await fetch('https://botcalendary.ru/api/v1/subscriptions/trial', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: req.headers.get('cookie') || '',
    },
    credentials: 'include',
    cache: 'no-store',
  })
  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}