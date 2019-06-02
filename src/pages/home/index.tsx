import { Grid } from "@alifd/next";
import Form from "../../components/base/form";
import * as React from "react";
import axiosInstance from '../../net';

import "./index.scss";
const { useEffect, useState, useMemo, useCallback } = React;
const { Row, Col } = Grid;

async function fetchFromData(): Promise<any> {
  const resp = await axiosInstance.get('/mock/form.json');
  return resp.data;
}

function Home() {
  const [formData, setFromData] = useState([]);
  const [count, setCount] = useState(1);
  const [val, setValue] = useState('');
  useEffect(() => {
    fetchFromData().then(val => setFromData(val));
  }, []);
  const expensive = useMemo(() => {
    console.log('compute');
    let sum = 0;
    for (let i = 0; i < count * 100; i++) {
      sum += i;
    }
    return sum;
  }, [count]);

  const callback = useCallback(() => {
    console.log(count);
  }, [count]);


  return (
    <div className="redux-demo-home">
      <h4 onClick={callback}>{count}-{val}-{expensive}</h4>
      <Row>
        <Col span="8" style={{ marginLeft: "20px" }}>
          <Form dataSource={formData} />
        </Col>
      </Row>
    </div>);
}
export default Home;
