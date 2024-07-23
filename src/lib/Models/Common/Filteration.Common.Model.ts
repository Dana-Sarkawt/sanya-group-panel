import { ListAttributesRequest } from "../Request/ListAttributes.Request.Model";

export class Filtration<T> extends ListAttributesRequest {
  options?: T;
  field?: string;
}
