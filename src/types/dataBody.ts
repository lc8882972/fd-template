import IDataList from "./dataList";

export default interface IDataBody {
  current: number;
  pageSize: number;
  total: number;
  list: IDataList[];
}
