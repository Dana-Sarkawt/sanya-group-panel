import { Status } from "../Enum/Status.Enum.Model";
export namespace Project {
  export class Create {
    name: string = "";
    status: null | Status = null;
  }
  export class Update {
    id: number = 0;
    name: string = "";
    status: null | Status = null;
  }
}
