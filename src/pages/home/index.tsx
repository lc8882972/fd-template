import * as React from "react";
import { Grid } from "@alifd/next";
import Form from "components/base/form";
import axiosInstance from '../../net';
import { ThemeContext } from '../../store/context';

import "./index.scss";
const { useEffect, useState, useContext } = React;
const { Row, Col } = Grid;

function Home() {
  const { foreground, background } = useContext(ThemeContext);

  console.log(foreground, background);
  const [formData, setFromData] = useState([]);
  useEffect(() => {
    async function fetchFromData() {
      const resp = await axiosInstance.get('/mock/form.json');
      console.log(resp);
      setFromData(resp.data);
    }

    fetchFromData();
  }, []);

  return (
    <div className="redux-demo-home">
      <div className="words">
        <span>
          当前页面为 只包含 React-Router 的案例页面， 这里是home路由页{" "}
        </span>
      </div>
      <Row>
        <Col span="8" style={{ marginLeft: "20px" }}>
          <Form dataSource={formData} />
        </Col>
      </Row>
    </div>);
}
export default Home;
