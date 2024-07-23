export class Store<T> {
  data: Array<T> = new Array<T>();
  error?: string = "";
  count: number = 0;
  pages?: number = 0;
}
