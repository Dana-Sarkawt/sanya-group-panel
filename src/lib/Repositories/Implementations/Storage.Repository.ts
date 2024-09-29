import { Supabase } from "$lib/Supabase/Supabase";
import moment from "moment";
import type { IStorageRepository } from "../Interfaces/I.Storage.Repository";

export class StorageRepository implements IStorageRepository {
  async uploadImageAsync(image: File, folderName?: string): Promise<string> {
    try {
      const response = await Supabase.client.storage
        .from("Sanya")
        .upload(
          `${folderName ?? "public/"}${moment().format("YY-MM-DD:HH:mm:ss")}${image.name}`,
          image,
        );
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response.data.fullPath;
    } catch (error) {
      throw error;
    }
  }
  async deleteImageAsync(id: string): Promise<void> {
    try {
      throw new Error("Method not implemented.");
    } catch (error) {
      throw error;
    }
  }
}
