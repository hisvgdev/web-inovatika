import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ success: true })
  response.cookies.set('access_token', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
  })
  response.cookies.set('refresh_token', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
  })
  response.cookies.set('last_refresh', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
  })
  return response
}
