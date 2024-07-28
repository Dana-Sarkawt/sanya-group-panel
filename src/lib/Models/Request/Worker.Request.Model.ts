export namespace Worker {
  export class Create {
    name: string = "";
    project_id: number = 0;
  }

  export class Update {
    id: number = 0;
    name: string = "";
    project_id: number = 0;
  }
}
