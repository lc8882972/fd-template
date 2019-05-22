import * as React from "react";
import { Grid } from "@alifd/next";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from 'immutability-helper';
import Dustbin from "./Dustbin";
import Box from "./Box";
import axios from '../../net/index';
import { IAction } from '../../types'

interface IState {
  isLoading: boolean,
  fields: any[],
  pageFields: any[]
}

const initialState = {
  isLoading: true,
  fields: [],
  pageFields: []
};

function reducer<IState>(state: IState, action: IAction): IState {
  switch (action.type) {
    case "success":
      return Object.assign({}, state, { ...action.payload }, { isLoading: false })
      break;
    case "error":
      return Object.assign({}, state, { ...action.payload }, { isLoading: false })
      break;
    case "updateField":
      return Object.assign({}, state, action.payload)
      break;
    default:
      throw new Error('action.type not case');
  }
}
const { useEffect, useReducer, useCallback } = React;
const { Row, Col } = Grid;


function Page() {
  const [state, dispatch] = useReducer<IState, IAction>(reducer, initialState);
  useEffect(() => {
    axios.get('/mock/fields.json').then(resp => {
      dispatch({ type: "success", payload: resp.data })
    }).catch(err => {
      dispatch({ type: "error", payload: initialState })
    })
  }, []);

  const addField = useCallback(
    (field: any) => {
      const { pageFields } = state;
      const newPageFields = pageFields.slice();
      newPageFields.push(field);
      dispatch({ type: 'updateField', payload: { pageFields: newPageFields } });
    },
    [state.pageFields]
  )

  const findField = useCallback(
    (id: string) => {
      const card = state.pageFields.filter(c => `${c.id}` === id)[0]
      return {
        card,
        index: state.pageFields.indexOf(card),
      }
    },
    [state.pageFields],
  )

  const moveField = useCallback(
    (id: string, atIndex: number) => {
      const { card, index } = findField(id);
      const { pageFields } = state;

      const newPageFields = update(pageFields, {
        $splice: [[index, 1], [atIndex, 0, card]],
      });

      dispatch({ type: 'updateField', payload: { pageFields: newPageFields } });
    },
    [state.pageFields],
  )

  const removeField = (field: any): void => {
    const { pageFields } = state;
    const index = pageFields.findIndex((item) => item.name === field.name);
    const newFields = pageFields.slice().splice(index, 1);
    dispatch({ type: 'updateField', payload: { pageFields: newFields } });
  }
  console.log('renderer');
  return (
    <div>
      <Row>
        <Col span="4">
          <p>页面配置选项</p>
          <div>
            {state.fields.map((item, index) => <Box key={item.name} index={index} {...item} />)}
          </div>
        </Col>
        <Col span="20">

          <p>页面配置结果</p>
          <Dustbin fields={state.pageFields} addField={addField} moveField={moveField} removeField={removeField} />
        </Col>
      </Row>
    </div>
  );
}

export default DragDropContext(HTML5Backend)(Page);

