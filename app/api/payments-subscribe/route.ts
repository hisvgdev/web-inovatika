import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch("https://botcalendary.ru/api/v1/payments/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: req.headers.get("cookie") || "",
      },
      cache: "no-cache",
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({
      error: "Invalid JSON in response from upstream service",
    }));

    if (!res.ok) {
      return new Response(JSON.stringify({
        error: data || "Upstream service returned an error",
        status: res.status,
      }), {
        status: res.status,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({
      error: error.message || "Internal Server Error",
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
