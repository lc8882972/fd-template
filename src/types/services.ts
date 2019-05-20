import { IHead, IDataBody } from "types";

export default interface IService {
  body: IDataBody;
  head: IHead;
  topButtons: any[];
}
