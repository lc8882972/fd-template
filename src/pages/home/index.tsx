import * as React from "react";
import "./index.scss";
import { Grid } from "@alifd/next";
import Form from "components/base/form";

const { Row, Col } = Grid;
interface IState {
  form: any[];
}

class Home extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      form: []
    };

    this.getData().then(json => {
      this.setState({ form: json.data });
    });
  }
  getData = (): Promise<any> => {
    return fetch("/mock/form.json").then(response => {
      return response.json();
    });
  };

  render() {
    return (
      <div className="redux-demo-home">
        <div className="words">
          <span>
            当前页面为 只包含 React-Router 的案例页面， 这里是home路由页{" "}
          </span>
        </div>
        <Row>
          <Col span="8" style={{ marginLeft: "20px" }}>
            <Form dataSource={this.state.form} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
