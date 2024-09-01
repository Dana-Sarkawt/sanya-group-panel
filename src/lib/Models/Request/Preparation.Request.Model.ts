export namespace Preparation {
  export class Create {
    description: string = "";
    project_id: number = 0;
    image?: string = "";
  }

  export class Update {
    id: number = 0;
    description: string = "";
    project_id: number = 0;
    image?: string = "";
  }
}
