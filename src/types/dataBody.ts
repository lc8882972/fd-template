import { IDataList } from "types";

export default interface IDataBody {
  current: number;
  pageSize: number;
  total: number;
  list: IDataList[];
}
