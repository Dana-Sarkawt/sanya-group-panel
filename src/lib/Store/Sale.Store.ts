import type { GenericListOptions } from '$lib/Models/Common/ListOptions.Common.Model';
import type { Store } from '$lib/Models/Response/Store.Response.Model';
import { SalesRepository } from '$lib/Repositories/Implementations/Sales.Repository';
import type { Database } from '$lib/Supabase/Types/database.types';
import { get, writable } from 'svelte/store';
import { toastStore } from './Toast.Store';
import { _ } from 'svelte-i18n';

const salesRepository = new SalesRepository();

const createSaleStore = () => {
	const { subscribe, set, update } = writable<Store<Database['public']['Tables']['Sales']['Row']>>({
		data: [],
		count: 0
	});
	return {
		subscribe,
		set: async (data: Store<Database['public']['Tables']['Sales']['Row']>) => set(data),
		create: async (data: Database['public']['Tables']['Sales']['Insert']) => {
			try {
				const response = await salesRepository.createSaleAsync(data);
				if (response.error) {
					throw new Error(get(_)('failed-to-create-sale'));
				}
				toastStore.success(get(_)('sale-created-successfully'));
				update((store) => {
					store.data.push(response.data);
					store.count++;
					return store;
				});
				return response;
			} catch (error) {
				if (error instanceof Error) {
					toastStore.error(error.message);
				} else {
					toastStore.error(get(_)('failed-to-create-sale'));
				}
			}
		},
		get: async (id: number) => {
			try {
				const response = await salesRepository.readSaleAsync(id);
				if (response.error) {
					throw new Error(get(_)('failed-to-get-sale'));
				}
				return response;
			} catch (error) {
				if (error instanceof Error) {
					toastStore.error(error.message);
				} else {
					toastStore.error(get(_)('failed-to-get-sale'));
				}
			}
		},
		getAll: async (options?: GenericListOptions) => {
			try {
				const response = await salesRepository.readSalesAsync(options);
				if (response.error) {
					throw new Error(get(_)('failed-to-get-sale'));
				}
				const pages = Math.ceil(response.count! / (options?.limit! ?? 10));
				set({
					data: response.data,
					count: response.count ?? 0,
					pages
				});
				return { data: response.data, count: response.count ?? 0, pages };
			} catch (error) {
				if (error instanceof Error) {
					toastStore.error(error.message);
				} else {
					toastStore.error(get(_)('failed-to-get-sale'));
				}
			}
		},
		getAllWithoutFilter: async (projectId: number) => {
			try {
				const response = await salesRepository.readSalesWithoutFilterAsync(projectId);
				if (response.error) {
					throw new Error(get(_)('failed-to-get-sale'));
				}
				return {
					data: response.data,
					count: response.count ?? 0
				};
			} catch (error) {
				if (error instanceof Error) {
					toastStore.error(error.message);
				} else {
					toastStore.error(get(_)('failed-to-get-sale'));
				}
			}
		},
		getOverhaulDepositsByProjectId: async (projectId: number) => {
			try {
				const response = await salesRepository.readOverhaulDepositsByProjectIdAsync(projectId);
				if (response.error) {
					throw new Error(get(_)('failed-to-get-sale'));
				}
				return response.data;
			} catch (error) {
				if (error instanceof Error) {
					toastStore.error(error.message);
				} else {
					toastStore.error(get(_)('failed-to-get-sale'));
				}
			}
		},
		getOverhaulFinancialsByProjectId: async (projectId: number) => {
			try {
				const response = await salesRepository.readOverhaulFinancialsByProjectIdAsync(projectId);
				if (response.error) {
					throw new Error(get(_)('failed-to-get-sale'));
				}
				return response.data;
			} catch (error) {
				if (error instanceof Error) {
					toastStore.error(error.message);
				} else {
					toastStore.error(get(_)('failed-to-get-sale'));
				}
			}
		},
		getDepositsBySaleIds: async (ids: number[]) => {
			try {
				console.log('ids', ids);
				const response = await salesRepository.readDepositsBySaleIdsAsync(ids);
				if (response.error) {
					throw new Error(get(_)('failed-to-get-sale'));
				}
				return response.data;
			} catch (error) {
				if (error instanceof Error) {
					toastStore.error(error.message);
				} else {
					toastStore.error(get(_)('failed-to-get-sale'));
				}
			}
		},
		getFinancialBySaleIds: async (ids: number[]) => {
			try {
				const response = await salesRepository.readFinancialBySaleIdsAsync(ids);
				if (response.error) {
					throw new Error(get(_)('failed-to-get-sale'));
				}
				return response.data;
			} catch (error) {
				if (error instanceof Error) {
					toastStore.error(error.message);
				} else {
					toastStore.error(get(_)('failed-to-get-sale'));
				}
			}
		},
		update: async (data: Database['public']['Tables']['Sales']['Update']) => {
			try {
				if (!data.id || data.id === 0) {
					throw new Error('ID is required to update a sale');
				}
				const response = await salesRepository.updateSaleAsync(data);
				if (response.error) {
					throw new Error(get(_)('failed-to-update-sale'));
				}
				toastStore.success(get(_)('sale-updated-successfully'));
				update((store) => {
					store.data = store.data.map((sale) => (sale.id === data.id ? response.data : sale));
					return store;
				});
				return response;
			} catch (error) {
				if (error instanceof Error) {
					toastStore.error(error.message);
				} else {
					toastStore.error(get(_)('failed-to-update-sale'));
				}
			}
		},
		delete: async (id: number) => {
			try {
				const response = await salesRepository.deleteSaleAsync(id);
				if (response.error) {
					throw new Error(get(_)('failed-to-delete-sale'));
				}
				toastStore.success(get(_)('sale-deleted-successfully'));
				update((store) => {
					store.data = store.data.filter((sale) => sale.id !== id);
					store.count--;
					return store;
				});
				return response;
			} catch (error) {
				if (error instanceof Error) {
					toastStore.error(error.message);
				} else {
					toastStore.error(get(_)('failed-to-delete-sale'));
				}
			}
		}
	};
};

export const saleStore = createSaleStore();
