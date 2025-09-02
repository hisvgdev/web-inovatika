import { getMe } from "@/utils/api/users.api"
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const user = await getMe()
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка при получении данных пользователя' }, { status: 500 })
  }
}