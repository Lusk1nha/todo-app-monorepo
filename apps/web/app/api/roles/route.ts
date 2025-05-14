import { authOptions } from "@todo-app/network/authOptions";
import { getServerSession } from "next-auth/next";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const response = await fetch("http://localhost:8000/api/v1/roles/me");

  const data = await response.json();

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Failed to fetch roles" }), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
