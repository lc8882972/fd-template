import * as React from "react";
import { Pagination, Table } from "@alifd/next";

import { IDataBody, IHead, IDataList } from '../../types';
const { useCallback, useState } = React;

interface IProps {
  head: IHead[];
  data: IDataBody;
  loading: boolean;
}

function renderColumn(cols: IHead[]) {


  return cols.sort((a: IHead, b: IHead) => a.index - b.index).map((col, index) => {
    return (
      <Table.Column title={col.caption} dataIndex={col.name} key={col.caption} />
    );
  });
}

const render = (value: any, index: number, record: IDataList) => {
  return record.listButton.map((item) => {
    return <a key={item.name}>{item.name}</a>
  })
};

function List({ data, loading, head }: IProps) {

  const [selectKeys, updateKeys] = useState([]);
  const onChange = useCallback((selectedRowKeys: never[], records: any[]) => {
    updateKeys(selectedRowKeys);
  }, []);
  const rowSelection = {
    getProps: (record: any) => {
      return {
        disabled: record.id === 100306660942
      };
    },
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
        <Table.Column cell={render} title="操作" />
      </Table>
      <Pagination className="page-demo" total={data.total} pageSize={data.pageSize} />
    </div>
  );
}
export default List;