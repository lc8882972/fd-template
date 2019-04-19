import * as React from "react";
import "./index.scss";
import { Table, Pagination, Tab, Form, Input } from "@alifd/next";
import { RangePicker } from "@alifd/next/lib/date-picker";

interface IState {
  loading: boolean;
  dataSource: Readonly<Array<any>>;
  rowSelection: any;
}

const dataSource = (j: number) => {
  const result = [];
  for (let i = 0; i < 10; i++) {
    result.push({
      title: {
        name: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible`
      },
      id: 100306660940 + i + j,
      time: 2000 + j
    });
  }
  return result;
};

class Page1 extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      dataSource: dataSource(10),
      loading: false,
      rowSelection: {
        onChange: this.onChangeS.bind(this),
        onSelect: function(selected: any, record: any, records: any) {
          console.log("onSelect", selected, record, records);
        },
        onSelectAll: function(selected: any, records: any) {
          console.log("onSelectAll", selected, records);
        },
        selectedRowKeys: [100306660940, 100306660941]
      }
    };
    // this.ajax('/mock/home.json');
  }

  // ajax = (url:string)=>{
  //   fetch(url,{method:'GET'});
  // }

  onRowClick = (record: any, index: number, e: Event) => {
    console.log(record);
    console.log(index);
  };
  onChangeS(ids: any, records: any) {
    const { rowSelection } = this.state;
    rowSelection.selectedRowKeys = ids;
    console.log("onChange", ids, records);
    this.setState({ rowSelection });
  }
  onChange = (currentPage: number) => {
    this.setState({
      loading: true
    });
    setTimeout(() => {
      this.setState({
        dataSource: dataSource(currentPage * 10),
        loading: false
      });
    }, 500);
  };

  rowSelection = {
    onChange: this.onChange,
    getProps: (record: any) => {
      return {
        disabled: record.id === 100306660942
      };
    }
  };
  renderR = (value: string, index: number, record: any) => {
    return <a>Remove({record.id})</a>;
  };
  render() {
    return (
      <div className="redux-demo-home">
        <div className="words">
          <span>
            当前页面为 只包含 React-Router 的案例页面， 这里是Page1路由页{" "}
          </span>
        </div>
        <Tab>
          <Tab.Item title="精简查询" key="1">
            <Form labelAlign="left" inline>
              <Form.Item label="date:">
                <RangePicker />
              </Form.Item>
              <Form.Item>
                <Form.Submit>Submit</Form.Submit>
              </Form.Item>
            </Form>
          </Tab.Item>
          <Tab.Item title="精确查询" key="2">
            <Form labelAlign="left" inline>
              <Form.Item label="id:">
                <Input />
              </Form.Item>
              <Form.Item label="date:">
                <RangePicker />
              </Form.Item>
              <Form.Item>
                <Form.Submit>Submit</Form.Submit>
              </Form.Item>
            </Form>
          </Tab.Item>
        </Tab>
        <Table
          dataSource={this.state.dataSource}
          loading={this.state.loading}
          isZebra={true}
          onRowClick={this.onRowClick}
          rowSelection={this.state.rowSelection}
        >
          <Table.Column title="Id" dataIndex="id" />
          <Table.Column title="Title" dataIndex="title.name" />
          <Table.Column title="Time" dataIndex="time" />
          <Table.Column cell={this.renderR} width={200} />
        </Table>
        <Pagination onChange={this.onChange} className="page-demo" />
      </div>
    );
  }
}

export default Page1;
