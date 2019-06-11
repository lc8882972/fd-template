import * as React from "react";
import { Pagination, Table } from "@alifd/next";

import { IDataBody, IHead, IDataList } from '../../types';
import * as styles from './index.module.scss';

interface IProps {
  head: IHead[];
  data: IDataBody;
  loading: boolean;
  onPaginationChange?: (current: number) => void;
  onRowClick?: (record: any, index: number, e: Event) => void;
  onRowButtonClick?: (button: any, record: any) => void;
}

function link(value: string) {
  return <a href="#">{value}</a>
}

function renderColumn(cols: IHead[]) {


  return cols.sort((a: IHead, b: IHead) => a.index - b.index).map((col) => {
    if (col.dataType === 'url') {
      return <Table.Column title={col.caption} dataIndex={col.name} key={col.caption} cell={link} />
    } else {
      return (
        <Table.Column title={col.caption} dataIndex={col.name} key={col.caption} />
      );
    }

  });
}


function List({ data, loading, head, onPaginationChange, onRowClick, onRowButtonClick }: IProps) {

  // const [selectKeys, updateKeys] = useState<any>([]);
  // const onChange = (selectedRowKeys: any[], records: any[]) => {
  //   updateKeys(selectedRowKeys);
  // };
  // const rowSelection = {
  //   onChange,
  // };

  const onHandleClick = (button: any, record: any): void => {
    if (onRowButtonClick) {
      onRowButtonClick(button, record);
    }
  }

  const render = (value: any, index: number, record: IDataList) => {
    return record.listButton.map((item) => {
      return (<a className={styles.link} key={item.name} href="javascript:void(0)" onClick={() => onHandleClick(item, record)}>{item.name}</a>);
    })
  };

  return (
    <div>
      <Table
        dataSource={data.list}
        loading={loading}
        isZebra={true}
        onRowClick={onRowClick}
      >
        {renderColumn(head)}
        <Table.Column width={300} cell={render} title="操作" />
      </Table>
      <Pagination className={styles.pagination} total={data.total} pageSize={data.pageSize} onChange={onPaginationChange} />
    </div>
  );
}
export default List;
