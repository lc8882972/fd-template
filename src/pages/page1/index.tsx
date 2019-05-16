import { Form, Input, Tab } from "@alifd/next";
import { RangePicker } from "@alifd/next/lib/date-picker";
import ListTable from "components/table/index";
import * as React from "react";
import "./index.scss";

interface IState {
  loading: boolean;
  dataSource: Readonly<any[]>;
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

const headData = [
  {
    title: "id",
    dataIndex: "id"
  },
  {
    title: "标题",
    dataIndex: "title.name"
  },
  {
    title: "时间",
    dataIndex: "time"
  }
];
class Page1 extends React.Component<any, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      dataSource: dataSource(10),
      loading: false,
    };
  }

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
          head={headData}
        />
      </div>
    );
  }
}

export default Page1;
