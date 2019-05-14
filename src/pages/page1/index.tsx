import { Form, Input, Pagination, Tab, Table } from "@alifd/next";
import { RangePicker } from "@alifd/next/lib/date-picker";
import ListTable from "components/table/index";
import * as React from "react";
import "./index.scss";

interface IState {
  loading: boolean;
  dataSource: Readonly<any[]>;
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

  // console.log(JSON.stringify(result));
  return result;
};

class Page1 extends React.Component<any, IState> {

  public rowSelection = {
    onChange: this.onChange,
    getProps: (record: any) => {
      return {
        disabled: record.id === 100306660942
      };
    }
  };
  constructor(props: any) {
    super(props);
    this.state = {
      dataSource: dataSource(10),
      loading: false,
      rowSelection: {
        onChange: this.onChangeS.bind(this),
        onSelect(selected: any, record: any, records: any) {
          console.log("onSelect", selected, record, records);
        },
        onSelectAll(selected: any, records: any) {
          console.log("onSelectAll", selected, records);
        },
        selectedRowKeys: [100306660940, 100306660941]
      }
    };
  }

  // ajax = (url:string)=>{
  //   fetch(url,{method:'GET'});
  // }

  public onRowClick = (record: any, index: number, e: Event) => {
    console.log(record);
    console.log(index);
  };
  public onChangeS(ids: any, records: any) {
    const { rowSelection } = this.state;
    rowSelection.selectedRowKeys = ids;
    console.log("onChange", ids, records);
    this.setState({ rowSelection });
  }
  public onChange = (currentPage: number) => {
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
  public renderR = (value: string, index: number, record: any) => {
    return <a>删除({record.id})</a>;
  };
  public render() {
    return (
      <div className="redux-demo-home">
        <div className="words">
          <span>
            当前页面为 只包含 React-Router 的案例页面， 这里是Page1路由页{" "}
          </span>
        </div>
        <Tab>
          <Tab.Item title="精简查询" key="1">
            <Form labelAlign="left" inline={true}>
              <Form.Item label="date:">
                <RangePicker />
              </Form.Item>
              <Form.Item>
                <Form.Submit>Submit</Form.Submit>
              </Form.Item>
            </Form>
          </Tab.Item>
          <Tab.Item title="精确查询" key="2">
            <Form labelAlign="left" inline={true}>
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
        <ListTable
          loading={false}
          data={dataSource(10)}
          head={[
            {
              title: "id",
              dataIndex:"id"
            },
            {
              title: "标题",
              dataIndex:"title.name"
            },
            {
              title: "时间",
              dataIndex:"time"
            }
          ]}
        />
      </div>
    );
  }
}

export default Page1;
