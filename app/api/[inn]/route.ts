import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const inn = req.nextUrl.searchParams.get('inn');

  if (!inn) {
    return NextResponse.json({ error: 'INN обязательно!' }, { status: 400 });
  }

  try {
    const apiUrl = `https://botcalendary.ru/api/v1/files/inn/${inn}`;

    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: req.headers.get('cookie') || '',
      },
      credentials: 'include',
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`Ошибка при получении файла от внешнего API:`, await res.text());
      return NextResponse.json({ error: 'Файл не найден' }, { status: res.status });
    }

    const blob = await res.blob();

    return new NextResponse(blob, {
      status: res.status,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${inn}.pdf"`,
      },
    });

  } catch (error) {
    console.error('Сетевая ошибка при запросе:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
