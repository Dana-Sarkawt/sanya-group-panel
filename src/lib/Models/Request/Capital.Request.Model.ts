import moment from "moment";
export namespace Capital {
  export class Create {
    description: string = "";
    price: number = 0;
    date: Date | string = moment(new Date()).format("YYYY-MM-DD");
    project_id: number = 0;
  }
}
