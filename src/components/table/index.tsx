import { Pagination, Table } from "@alifd/next";
import * as React from "react";

interface IProps {
  head: any[];
  data: any[];
  loading: boolean;
}

class List extends React.Component<IProps> {

  public rowSelection = {
    onChange: this.onChange,
    getProps: (record: any) => {
      return {
        disabled: record.id === 100306660942
      };
    },
  };
  public renderColumn(cols: any[]) {
    return cols.map((col, index) => {
      return (
        <Table.Column title={col.title} dataIndex={col.dataIndex} key={index} />
      );
    });
  }

  public onChange(...args: any[]): void {
    console.log(args);
  }

  public render() {
    const { data, loading, head } = this.props;
    return (
      <div>
        <Table
          dataSource={data}
          loading={loading}
          isZebra={true}
          rowSelection={this.rowSelection}
        >
          {this.renderColumn(head)}
        </Table>
        <Pagination className="page-demo" total={data.length} pageSize={5}/>
      </div>
    );
  }
}

export default List;
