import * as React from "react";
import { Form, Input, Tab, Button, Dialog } from "@alifd/next";
import { RangePicker } from "@alifd/next/lib/date-picker";
import ListTable from "../../components/table/index";
import UForm from '../../components/form';
import axios from '../../net/index';
import { IAction, IDataBody, IHead } from '../../types';

import { toJsonSchame } from '../../utils';

import "./index.scss";

const { useState, useCallback, useEffect, useReducer } = React;


interface IState {
  isLoading: boolean;
  pageUrl: string;
  body: IDataBody;
  head: IHead[];
  topButtons: [];
}



function init(url: string): IState {
  const initialState: IState = {
    isLoading: true,
    pageUrl: url,
    body: {
      list: [],
      current: 1,
      pageSize: 10,
      total: 0,
    },
    head: [],
    topButtons: []
  };

  return initialState;
}

function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case 'success':
      return Object.assign({}, state, action.payload, { isLoading: false });
    case 'error':
      return Object.assign({}, state, { isLoading: false });
    default:
      throw new Error();
  }
}

function Page({ location }: any) {

  const currentPageUrl = location.pathname + location.search;
  const [isVisble, setVisble] = useState(false);
  const [state, dispatch] = useReducer(reducer, currentPageUrl, init);
  const parmas = {
    page: 1,
    pageCount: 10,
  }
  useEffect(() => {
    const fetchData = (parms: any): Promise<any> => {
      return axios.get('/mock/services.json');
    }

    fetchData(parmas).then(resp => {
      dispatch({ type: 'success', payload: resp.data });
    });
  }, [currentPageUrl]);

  const onButtonsClick = useCallback((button: any): void => {
    if (button.type === 'pop_form') {
      setVisble(true);
    }
  }, [currentPageUrl])

  const closeDialog = useCallback((event: any): void => {
    setVisble(false);
  }, [currentPageUrl])
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
      <div>
        <Dialog title="新建" footerAlign="center" visible={isVisble} onCancel={closeDialog} onOk={() => setVisble(false)}>
          <UForm jsonSchema={toJsonSchame(state.head)} />
        </Dialog>
        <div className="topButtons">
          {state.topButtons.map((item: any) => {
            return <Button type="primary" key={item.name} onClick={() => onButtonsClick(item)}>{item.name}</Button>
          })}
        </div>
        <ListTable
          loading={state.isLoading}
          data={state.body}
          head={state.head}
        />
      </div>
    </div>
  );

}
export default Page;
