export namespace Sale {
  export class Create {
    description: string = "";
    project_id: number = 0;
    image?: string = "";
  }

  export class Update {
    description: string = "";
    id: number = 0;
    image?: string = "";
  }
}
