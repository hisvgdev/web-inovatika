import { NextRequest, NextResponse } from 'next/server'
import { THIRTY_MINUTES } from './constants/global.constants'

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value
  const refreshToken = req.cookies.get('refresh_token')?.value
  const lastRefresh = req.cookies.get('last_refresh')?.value

  const now = Date.now()
  const lastRefreshTime = lastRefresh ? parseInt(lastRefresh) : 0

  const shouldRefresh = !accessToken || now - lastRefreshTime >= THIRTY_MINUTES

  if (!shouldRefresh) {
    return NextResponse.next()
  }

  const res = await fetch('https://botcalendary.ru/api/v1/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ access_token: accessToken, refresh_token: refreshToken }),
  })

  if (!res.ok) {
    console.error('Ошибка при обновлении токена')
    return NextResponse.next()
  }

  const data = await res.json()
  const response = NextResponse.next()

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
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  response.cookies.set('last_refresh', now.toString(), {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: THIRTY_MINUTES,
    path: '/',
  })

  return response
}

export const config = {
  matcher: [
    '/about-service/:path*',
    '/account/:path*',
    '/programs/:path*',
    '/subscription/:path*',
    '/api/:path*',
  ],
}

