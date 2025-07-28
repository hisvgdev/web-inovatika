import { THIRTY_MINUTES } from "@/constants/global.constants"
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { access_token, refresh_token } = await req.json()

  const response = NextResponse.json({ success: true })

  response.cookies.set('access_token', access_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: THIRTY_MINUTES,
    path: '/',
  })

  response.cookies.set('refresh_token', refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 604800, // 7 days
    path: '/',
  })

  return response
}