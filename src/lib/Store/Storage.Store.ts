import { StorageRepository } from "$lib/Repositories/Implementations/Storage.Repository";
import { get, writable } from "svelte/store";
import { toastStore } from "./Toast.Store";
import { _ } from "svelte-i18n";

const storageRepository = new StorageRepository();

const createStorageStore = () => {
  const { subscribe, set, update } = writable<string>("");

  return {
    subscribe,
    uploadImage: async (image: File) => {
      try {
        const url = await storageRepository.uploadImageAsync(image);
        set(url);
        toastStore.success(get(_)("image-uploaded-successfully"));
        return url;
      } catch (error) {
        throw error;
      }
    },
    deleteImage: async (id: string) => {
      try {
        await storageRepository.deleteImageAsync(id);
        set("");
        toastStore.success(get(_)("image-deleted-successfully"));
      } catch (error) {
        throw error;
      }
    },
  };
};

export const storageStore = createStorageStore();
