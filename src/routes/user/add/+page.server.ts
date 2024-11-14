import { roleStore } from '$lib/Store/Role.Store';

export async function load() {
	const roles = await roleStore.getAll();
	return {
		roles
	};
}
