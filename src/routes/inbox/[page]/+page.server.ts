import { inboxStore } from "$lib/Store/Inbox.Store.js";

export async function load({ params, url }) {
  const page = Number(params.page);
  const inboxes = await inboxStore.getAll({
    limit: 10,
    page: page,
  });
  
  return {
    inboxes,
  };
}
