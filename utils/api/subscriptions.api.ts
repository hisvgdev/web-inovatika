import { internalFetch } from "./fetch.api";

export const checkSubscriptionExpired = async (): Promise<boolean> => {
  try {
    const res = await internalFetch(`https://botcalendary.ru/api/v1/subscriptions/check/expired`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      cache: "no-store",
    });

    if (res.ok) {
      return true;
    } else {
      console.error("Ошибка при проверке окончания подписки:", res.status);
      return false;
    }
  } catch (error) {
    console.error("Сетевая ошибка при проверке окончания подписки:", error);
    return false;
  }
};


export const getInviteLinks = async (): Promise<Record<'invite_links', string[]>> => {
  try {
    const res = await internalFetch(`https://botcalendary.ru/api/v1/subscriptions/invite-links`, {
      method: "GET",
      credentials: "include",
      next: {
        revalidate: 1200
      }
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Ошибка при получении ссылок");
    }

    return data;
  } catch (error) {
    console.error("Сетевая ошибка при получении ссылок:", error);
    throw error;
  }
};

export const disableSubscription = async (): Promise<boolean> => {
  try {
    const res = await fetch(`/api/disable-subs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      cache: "no-store",
    });

    if (res.ok) {
      return true;
    } else {
      console.error("Ошибка при проверке окончания подписки:", res.status);
      return false;
    }
  } catch (error) {
    console.error("Сетевая ошибка при проверке окончания подписки:", error);
    return false;
  }
};