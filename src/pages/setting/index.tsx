import * as React from "react";
import { Grid } from "@alifd/next";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Contaier from "./contaier";

const { Row, Col } = Grid;
@DragDropContext(HTML5Backend)
export default class Setting extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col span="4">
            <Row>
              <p>页面配置选项</p>
            </Row>
          </Col>
          <Col span="20">
            <Row>
              <p>页面配置结果</p>
              <Contaier />
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
