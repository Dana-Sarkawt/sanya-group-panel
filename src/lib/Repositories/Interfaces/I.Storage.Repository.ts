export interface IStorageRepository {
	uploadImageAsync(image: File): Promise<string>;
	deleteImageAsync(id: string): Promise<void>;
}
