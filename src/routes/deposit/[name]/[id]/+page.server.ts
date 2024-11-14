import { depositStore } from '$lib/Store/Deposit.Store.js';

export async function load({ params, url }) {
	const field = `${params.name}_id`;
	const deposits = await depositStore.getAll({
		field: field,
		equal: params.id
	});
	return {
		deposits
	};
}
