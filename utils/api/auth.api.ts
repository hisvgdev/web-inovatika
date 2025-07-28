import { TokenResponse } from "./types/types.api"

export const loginUser = async (data: FormData): Promise<{ status: string } | undefined> => {
  const body = {
    email: data.get("email"),
    password: data.get("password")
  }
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      console.error('Ошибка авторизации', await res.text())
      return undefined
    }

    return await res.json()
  } catch (error) {
    console.error('Ошибка при запросе логина:', error)
  }
}


export const refreshToken = async (data: FormData): Promise<TokenResponse | undefined> => {
  const requestBody = {
    access_token: data.get("access_token"),
    refresh_token: data.get("refresh_token"),
  }
  try {
    const res = await fetch(`https://botcalendary.ru/api/v1/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      console.error("Ошибка обновления токена:", status);
    };
  } catch (error) {
    console.error("Ошибка при выполнении запроса с обновлением токена:", error);
  }
}

export const passwordReset = async (data: FormData): Promise<void> => {
  const requestBody = {
    email: data.get("email"),
    password: data.get("password")
  }
  try {
    const res = await fetch(`/api/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody),
      credentials: "include",
      cache: "no-store",
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      console.error("Ошибка сброса пароля:", status);
    };
  } catch (error) {
    console.error("Ошибка при выполнении запроса со сбросом пароля:", error);
  }
}

export const passwordForgot = async (data: FormData): Promise<void> => {
  const email = data.get("email")

  const res = await fetch("https://botcalendary.ru/api/v1/auth/password/forgot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email }),
    cache: "no-store",
  })

  const result = await res.json()

  if (!res.ok) {
    const error = new Error(result?.detail || "Ошибка запроса")
    // @ts-ignore
    error.status = res.status
    throw error
  }

  return result
}



export const passwordRestore = async (requestBody: { token: string, password: string }): Promise<void> => {
  try {
    const res = await fetch(`https://botcalendary.ru/api/v1/auth/password/restore`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody),
      cache: "no-store",
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      console.error("Ошибка отправки запроса для обновления пароля:");
    };
  } catch (error) {
    console.error("Ошибка при выполнении запроса для обновления пароля:", error);
  }
}

export const passwordTelegramSet = async (data: FormData): Promise<void> => {
  const requestBody = {
    email: data.get("email"),
    password: data.get("password")
  }
  try {
    const res = await fetch(`/api/tg-password-set`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody),
      cache: "no-store",
    });

    const data = await res.json();

    if (res.ok) {
      return data;
    } else {
      console.error("Ошибка отправки запроса для обновления пароля:");
    };
  } catch (error) {
    console.error("Ошибка при выполнении запроса для обновления пароля:", error);
  }
}

export const updateTelegramUser = async (data: { tg_id: number }, user_id: string): Promise<any> => {
  const requestBody = {
    tg_id: data.tg_id,
  };

  try {
    const res = await fetch(`/api/telegram/${user_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      cache: "no-store",
    });

    const responseData = await res.json();

    if (!res.ok) {
      console.error("Ошибка запроса:", responseData);
      throw new Error(responseData?.error || "Ошибка обновления пользователя");
    }

    return responseData;
  } catch (error) {
    console.error("Ошибка при запросе:", error);
    throw error;
  }
};

