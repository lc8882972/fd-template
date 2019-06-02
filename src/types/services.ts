import { IHead, IDataBody } from "./index";

export default interface IService {
  body: IDataBody;
  head: IHead;
  topButtons: any[];
}
