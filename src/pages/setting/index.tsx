import { Grid } from "@alifd/next";
import * as React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Contaier from "./contaier";
import Box from "./Box";
import Card from './Card';

const { Row, Col } = Grid;
@DragDropContext(HTML5Backend)
export default class Setting extends React.Component {
  public render() {
    return (
      <div>
        <Row>
          <Col span="4">
            <p>页面配置选项</p>
            <div>
              <Card text="Write a cool JS library" id={1} />
              <Card text="Make it generic enough" d={2}/>
              <Card text="Write README" d={3} />
            </div>
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
