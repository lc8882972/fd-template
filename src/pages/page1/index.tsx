import * as React from "react";
import { Form, Input, Tab } from "@alifd/next";
import { RangePicker } from "@alifd/next/lib/date-picker";
import ListTable from "components/table/index";
import axios from '../../net/index';
import { IAction, IService, IDataBody, IHead } from '../../types';

import "./index.scss";

const { useEffect, useReducer } = React;

const fetchData = (parms: any): Promise<any> => {
  return axios.get('/mock/services.json');
}

interface IState {
  isLoading: boolean,
  body: IDataBody,
  head: IHead[],
  topButtons: []
}

const initialState = {
  isLoading: true,
  body: {
    list: [],
    current: 1,
    pageSize: 10,
    total: 0,
  },
  head: [],
  topButtons: []
};

function reducer(state: IState, action: IAction) {
  console.log(action.payload);
  switch (action.type) {
    case 'success':
      return Object.assign(state, action.payload, { isLoading: false });
    case 'error':
      return Object.assign(state, initialState);
    default:
      throw new Error();
  }
}

function Page() {

  const [state, dispatch] = useReducer<IState, IAction>(reducer, initialState as IState);
  const parmas = {
    page: 1,
    pageCount: 10,
  }
  useEffect(() => {
    fetchData(parmas).then(resp => {
      dispatch({ type: 'success', payload: resp.data } as IAction);
    });
  });
  return (
    <div className="redux-demo-home">
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
        loading={state.isLoading}
        data={state.body}
        head={state.head}
      />
    </div>
  );

}
export default Page;
