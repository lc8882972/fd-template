import { Pagination, Table } from "@alifd/next";
import * as React from "react";

const { useCallback, useState } = React;

interface IProps {
  head: any[];
  data: any[];
  loading: boolean;
}

function renderColumn(cols: any[]) {
  return cols.map((col, index) => {
    return (
      <Table.Column title={col.title} dataIndex={col.dataIndex} key={index} />
    );
  });
}


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
        dataSource={data}
        loading={loading}
        isZebra={true}
        rowSelection={rowSelection}
      >
        {renderColumn(head)}
      </Table>
      <Pagination className="page-demo" total={data.length} pageSize={5} />
    </div>
  );
}
export default List;
