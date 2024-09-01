import { StorageRepository } from "$lib/Repositories/Implementations/Storage.Repository";
import { writable } from "svelte/store";

const storageRepository = new StorageRepository();

const createStorageStore = () => {
  const { subscribe, set, update } = writable<string>("");

  return {
    subscribe,
    uploadImage: async (image: File) => {
      try {
        const url = await storageRepository.uploadImageAsync(image);
        set(url);
        return url;
      } catch (error) {
        throw error;
      }
    },
    deleteImage: async (id: string) => {
      try {
        await storageRepository.deleteImageAsync(id);
        set("");
      } catch (error) {
        throw error;
      }
    },
  };
};

export const storageStore = createStorageStore();
