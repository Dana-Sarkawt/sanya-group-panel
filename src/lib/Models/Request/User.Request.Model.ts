export namespace User {
  export class Create {
    name: string = "";
    email: string = "";
    phone: string = "";
    role: number | null = null;
    user_uid: string = "";
    password: string = "";
  }
  export class Update {
    id: number = 0;
    name: string = "";
    email: string = "";
    phone: string = "";
    role: number | null = null;
  }
  export class Delete {
    id: number = 0;
  }
}
