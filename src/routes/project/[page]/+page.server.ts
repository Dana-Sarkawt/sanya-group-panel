import { projectStore } from '$lib/Store/Project.Store';

export async function load({ params, url }) {
	const page = Number(params.page);
	const projects = await projectStore.getAll({
		limit: 10,
		page: page
	});
	return {
		projects
	};
}
