import { CreateChatsProps } from "./types/types.api";

export const createChats = async (specific: string): Promise<CreateChatsProps> => {
  try {
    const res = await fetch("/api/create-chats", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ specific }),
      headers: {
        'Content-Type': "application/json"
      }
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Ошибка при создании чата:');
      throw new Error('Failed to fetch user');
    }

    return data;
  } catch (error) {
    console.error('Сетевая ошибка при создании чата:', error);
    throw error;
  }
};

export const getChatsActive = async (): Promise<CreateChatsProps | boolean> => {
  try {
    const res = await fetch("/api/chats-active", {
      method: "GET",
      credentials: "include",
      headers: {
        'Content-Type': "application/json"
      }
    });

    const data = await res.json();

    if (res.status === 402) {
      return false;
    }

    if (!res.ok) {
      console.error('Ошибка при получении чата:');
      throw new Error('Failed to fetch user');
    }

    return data;
  } catch (error) {
    console.error('Сетевая ошибка при получении чата:', error);
    throw error;
  }
}

export const unactiveChat = async (): Promise<CreateChatsProps> => {
  try {
    const res = await fetch("/api/unactive-chats", {
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': "application/json"
      }
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Ошибка при удалении чата:');
      throw new Error('Failed to fetch user');
    }

    return data;
  } catch (error) {
    console.error('Сетевая ошибка при удалении чата:', error);
    throw error;
  }
};