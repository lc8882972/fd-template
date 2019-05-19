import { Grid } from "@alifd/next";
import * as React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Contaier from "./contaier";
import Box, { IBoxInstance } from "./Box";

const boxs: IBoxInstance[] = [
  {
    name: 'Glass',
    index: 0,
    backgroundColor: '#fff'
  },
  {
    name: 'Banana',
    index: 1,
    backgroundColor: '#fff'
  },
  {
    name: 'Paper',
    index: 2,
    backgroundColor: '#fff'
  }
];

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
              {boxs.map((item) => <Box key={item.index} {...item} />)}
            </div>
          </Col>
          <Col span="20">

            <p>页面配置结果</p>
            <Contaier />

          </Col>
        </Row>
      </div>
    );
  }
}
