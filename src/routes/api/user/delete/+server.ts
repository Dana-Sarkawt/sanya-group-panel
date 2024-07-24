import type { RequestHandler } from "@sveltejs/kit";

export const DELETE: RequestHandler = async ({ locals, params, request }) => {
  try {
    return new Response("User deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete user", { status: 500 });
  }
};
