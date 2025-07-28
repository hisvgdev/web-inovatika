

export const fetchFileByInn = async (inn: string): Promise<Blob | boolean | undefined> => {
  try {
    const res = await fetch(`/api/inn?inn=${encodeURIComponent(inn)}`, {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
    });

    if (res.status === 402) {
      console.warn(`Требуется подписка`);
      return false;
    }

    if (!res.ok && res.status !== 402) {
      console.error(`Ошибка при получении файла по ИНН ${inn}:`, res);
      return undefined;
    }

    return await res.blob();
  } catch (error) {
    console.error(`Сетевая или логическая ошибка при запросе файла по ИНН ${inn}:`, error);
    return undefined;
  }
};

