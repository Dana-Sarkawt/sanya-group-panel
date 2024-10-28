import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Store } from "$lib/Models/Response/Store.Response.Model";
import { InboxRepository } from "$lib/Repositories/Implementations/Inbox.Repository";
import type { Database } from "$lib/Supabase/Types/database.types";
import { get, writable } from "svelte/store";
import { toastStore } from "./Toast.Store";
import { _ } from "svelte-i18n";
import type { InboxEntity } from "$lib/Models/Entity/Inbox.Entity.Model";

const inboxRepository = new InboxRepository();

const createInboxStore = () => {
  const { subscribe, set, update } = writable<Store<InboxEntity>>({
    data: [],
    count: 0,
  });

  return {
    subscribe,
    set: async (data: Store<InboxEntity>) => set(data),
    create: async (data: Database["public"]["Tables"]["Inbox"]["Insert"]) => {
      try {
        const response = await inboxRepository.createInboxAsync(data);
        if (response.error) {
          toastStore.error(response.error.message);
          throw new Error(response.error.message);
        }
        update((store) => {
          store.data.push(response.data);
          store.count++;
          return store;
        });
        toastStore.success(get(_)("inbox-item-created"));
        return response;
      } catch (error) {
        toastStore.error(get(_)("failed-to-create-inbox-item"));
      }
    },
    get: async (id: number) => {
      try {
        const response = await inboxRepository.readInboxAsync(id);
        if (response.error) {
          toastStore.error(response.error.message);
          throw new Error(response.error.message);
        }
        return response;
      } catch (error) {
        toastStore.error(get(_)("failed-to-get-inbox-item"));
      }
    },
    getAll: async (options?: GenericListOptions) => {
      try {
        const response = await inboxRepository.readInboxesAsync(options);
        if (response.error) {
          toastStore.error(response.error.message);
          throw new Error(response.error.message);
        }

        const pages = Math.ceil(response.count! / (options?.limit! ?? 10));

        set({
          data: response.data,
          count: response.count ?? 0,
          pages: pages,
        });

        return {
          data: response.data,
          count: response.count ?? 0,
          pages: pages,
        };
      } catch (error) {
        toastStore.error(get(_)("failed-to-get-inboxes"));
      }
    },
    update: async (data: Database["public"]["Tables"]["Inbox"]["Update"]) => {
      try {
        const response = await inboxRepository.updateInboxAsync(data);
        if (response.error) {
          throw new Error(response.error.message);
        }
        update((store) => {
          const index = store.data.findIndex((item) => item.id === data.id);
          store.data[index] = response.data;
          return store;
        });
        toastStore.success(get(_)("inbox-item-updated"));
        return response;
      } catch (error) {
        toastStore.error(get(_)("failed-to-update-inbox-item"));
      }
    },
    delete: async (id: number) => {
      try {
        const response = await inboxRepository.deleteInboxAsync(id);
        update((store) => {
          store.data = store.data.filter((item) => item.id !== id);
          store.count--;
          return store;
        });
        toastStore.success(get(_)("inbox-item-deleted"));
        return response;
      } catch (error) {
        toastStore.error(get(_)("failed-to-delete-inbox-item"));
      }
    },
  };
};

export const inboxStore = createInboxStore();
