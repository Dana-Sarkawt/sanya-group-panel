import { projectStore } from "$lib/Store/Project.Store";

export async function load() {
  const projects = await projectStore.getAll();
  projectStore.set(projects!);
  return {
    projects,
  };
}
