import { Grid } from "@alifd/next";
import Form from "../../components/base/form";
import * as React from "react";
import axiosInstance from '../../net';

import "./index.scss";
const { useEffect, useState } = React;
const { Row, Col } = Grid;

async function fetchFromData(): Promise<any> {
  const resp = await axiosInstance.get('/mock/form.json');
  return resp.data;
}

function Home() {
  const [formData, setFromData] = useState([]);

  useEffect(() => {
    fetchFromData().then(val => setFromData(val));
  }, []);

  return (
    <div className="redux-demo-home">
      <Row>
        <Col span="8" style={{ marginLeft: "20px" }}>
          <Form dataSource={formData} />
        </Col>
      </Row>
    </div>);
}
export default Home;
