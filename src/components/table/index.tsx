import * as React from "react";
import { Pagination, Table } from "@alifd/next";

import { IDataBody, IHead, IDataList } from '../../types';
import * as styles from './index.module.scss';
const { useCallback, useState } = React;

interface IProps {
  head: IHead[];
  data: IDataBody;
  loading: boolean;
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

const render = (value: any, index: number, record: IDataList) => {
  return record.listButton.map((item) => {
    return <a className={styles.link} key={item.name} href="#">{item.name}</a>
  })
};

function List({ data, loading, head }: IProps) {

  const [selectKeys, updateKeys] = useState([]);
  const onChange = useCallback((selectedRowKeys: never[], records: any[]) => {
    updateKeys(selectedRowKeys);
  }, []);
  const rowSelection = {
    onChange,
  };

  return (
    <div>
      <Table
        dataSource={data.list}
        loading={loading}
        isZebra={true}
        rowSelection={rowSelection}
      >
        {renderColumn(head)}
        <Table.Column width={300} cell={render} title="操作" />
      </Table>
      <Pagination className={styles.pagination} total={data.total} pageSize={data.pageSize} />
    </div>
  );
}
export default List;
