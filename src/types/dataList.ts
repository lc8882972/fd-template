import IListButton from "./listButton";

export default interface IDataList {
  caption: string;
  description: string | null;
  id: string;
  name: string;
  listButton: IListButton[];
  pageButton: any[];
}
