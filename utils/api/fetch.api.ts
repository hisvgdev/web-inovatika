'use server';

import { headers } from "next/headers";

export const internalFetch = async (url: string, options: RequestInit) => {
  const currentHeaders = await headers();
  const headersObj: Record<string, string> = {};

  for (const [key, value] of currentHeaders.entries()) {
    headersObj[key] = value;
  }

  return fetch(url, {
    ...options,
    headers: {
      ...headersObj,
      ...options.headers,
    },
  });
};
