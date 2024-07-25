import moment from "moment";

export namespace Deposit {
  export class Create {
    description: string = "";
    price: number = 0;
    date: Date | string = moment(new Date()).format("YYYY-MM-DD");
    [x: string]: number | string | Date;
  }
}
