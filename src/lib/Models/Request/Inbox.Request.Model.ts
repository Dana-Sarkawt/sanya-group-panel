import moment from "moment";

export namespace Inbox {
  export class Create {
    title: string = "";
    description: string | null = null;
  }
  export class Update {
    id: number = 0;
    title: string = "";
    description: string | null = null;
  }
}
