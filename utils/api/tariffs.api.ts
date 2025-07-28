import { internalFetch } from "./fetch.api";
import { TariffsProps } from "./types/types.api";

export const fetchAllTariffs = async (): Promise<TariffsProps[] | undefined> => {
  try {
    const res = await internalFetch(`https://botcalendary.ru/api/v1/tariffs/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      next: {
        revalidate: 1200
      }
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Ошибка при получении тарифов');
    }

    return data;
  } catch (error) {
    console.error('Сетевая ошибка при запросе тарифов:', error);
  }
};

export const fetchLegalTariffs = async (): Promise<TariffsProps[] | undefined> => {
  try {
    const res = await internalFetch("https://botcalendary.ru/api/v1/tariffs/legal", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Ошибка при получении тарифов для юр. лиц:');
    }

    return data;
  } catch (error) {
    console.error('Сетевая ошибка при запросе тарифов для юр. лиц:', error);
  }
};

