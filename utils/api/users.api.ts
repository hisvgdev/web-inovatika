import { GetMeProps } from "./types/types.api";
import { internalFetch } from "./fetch.api";


export const getMe = async (): Promise<GetMeProps> => {
  try {
    const res = await internalFetch("https://botcalendary.ru/api/v1/users/me", {
      method: "GET",
      credentials: "include",
      next: { revalidate: 10 },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Ошибка при получении пользователя:');
      throw new Error('Failed to fetch user');
    }

    return data;
  } catch (error) {
    console.error('Сетевая ошибка при получении пользователя:', error);
    throw error;
  }
};

export const refreshUser = async () => {
  try {
    const res = await fetch('/api/refresh-user', {
      method: 'GET',
      credentials: 'include',
    })

    if (!res.ok) throw new Error('Не удалось получить пользователя')

    const user = await res.json()
    return user;
  } catch (err) {
    console.error('Ошибка при обновлении пользователя', err)
  }
}

export const sendEmailVerification = async (data: FormData) => {
  const requestBody = {
    email: data.get("email")
  }
  try {
    const res = await fetch(`/api/email-verify`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody),
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Ошибка при отправке письма:');
    }

    return data;
  } catch (error) {
    console.error('Сетевая ошибка при отправке письма:', error);
    throw error;
  }
};


export async function confirmEmailVerification(token: string) {
  const res = await fetch('/api/confirm-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || 'Неизвестная ошибка при подтверждении почты')
  }

  if (data.error) {
    throw new Error(data.error)
  }

  return data
}

export const createUser = async (data: FormData) => {
  const requestBody: Record<string, any> = {
    email: data.get("email"),
    tg_id: data.has("tg_id") ? data.get("tg_id") : null,
    password: data.get("password"),
    is_verified: false,
    role: "user"
  };

  try {
    const res = await fetch(`https://botcalendary.ru/api/v1/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (res.ok) {
      return true;
    } else {
      console.error("Ошибка регистрации:");
      return false;
    }
  } catch (error) {
    console.error("Ошибка при запросе:", error);
    return false;
  }
};

