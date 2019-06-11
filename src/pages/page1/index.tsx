import * as React from "react";
import { Button, Dialog } from "@alifd/next";
import ListTable from "../../components/table/index";
import UForm from '../../components/form';
import Filter from '../../components/filter-form';
import axios from '../../net/index';
import { IAction, IDataBody, IHead } from '../../types';

import { toJsonSchame } from '../../utils';

import * as styles from "./index.module.scss";

const { useState, useCallback, useEffect, useReducer } = React;


interface IState {
  isLoading: boolean;
  pageUrl: string;
  body: IDataBody;
  head: IHead[];
  topButtons: any[];
  pageConditions: any[]
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
    topButtons: [],
    pageConditions: []
  };

  return initialState;
}

function reducer(state: IState, action: IAction): IState {
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
  const [state, dispatch] = useReducer<(state: IState, action: IAction) => IState, string>(reducer, currentPageUrl, init);
  const parmas = {
    current: 1,
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

  const queryData = useCallback((values) => {
    console.log(values);
  }, [currentPageUrl]);

  const onRowButtonClick = useCallback((button: any, record: any): void => {
    console.log(button);
    console.log(record);
    if (button.type === 'pop_form') {
      setVisble(true);
    }
  }, [currentPageUrl]);

  return (
    <div className="redux-demo-home">
      <Filter pageConditions={state.pageConditions} onSubmitForm={queryData} />

      <Dialog title="新建" footerAlign="center" visible={isVisble} onCancel={closeDialog} onOk={() => setVisble(false)}>
        <UForm jsonSchema={toJsonSchame(state.head)} />
      </Dialog>
      <div className={styles.topButtons}>
        {state.topButtons.map((item: any) => {
          return <Button type="primary" key={item.name} onClick={() => onButtonsClick(item)}>{item.name}</Button>
        })}
      </div>
      <ListTable
        loading={state.isLoading}
        data={state.body}
        head={state.head}
        onRowButtonClick={onRowButtonClick}
      />

    </div>
  );

}
export default Page;
