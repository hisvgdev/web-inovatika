import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: 'Token обязательно!' }, { status: 400 });
  }

  try {

    const res = await fetch(`https://botcalendary.ru/api/v1/users/verify/email/confirm?token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: req.headers.get('cookie') || '',
      },
      credentials: 'include',
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Ошибка от внешнего API:', errorText);
      return NextResponse.json({ error: 'Ошибка от внешнего сервера' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });

  } catch (error) {
    console.error('Сетевая ошибка:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
