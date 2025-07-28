import { PaymentSubscribePayload, PaymentSubscribeResponse } from "./types/types.api";

export const subscribeToPayment = async (
  payload: PaymentSubscribePayload
): Promise<string | PaymentSubscribeResponse | undefined> => {
  try {
    const res = await fetch(`/api/payments-subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Ошибка при создании подписки на оплату");
    }

    return data;
  } catch (error) {
    console.error("Сетевая ошибка при подписке на оплату:", error);
  }
};

