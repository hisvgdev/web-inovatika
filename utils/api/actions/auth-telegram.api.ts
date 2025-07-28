'use server';

import { redirect } from 'next/navigation';

export const loginWithTelegram = async (telegram_id: number, init_data: string) => {
  const requestBody = {
    telegram_id,
    init_data
  };
  try {
    const res = await fetch(`https://botcalendary.ru/api/v1/auth/login/telegram`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody),
      cache: "no-store",
    });

    if (res.ok) {
      redirect('/programs');
    } else {
      const error = await res.json();
      console.error("Ошибка авторизации Telegram:", error);
    }
  } catch (err) {
    console.error("Сетевая ошибка авторизации Telegram:", err);
  }
};
