import * as React from "react";
import { Tree } from "@alifd/next";
import { observer, Provider } from "mobx-react";
import Store from "./store";

const store = new Store();

interface IState {
  data: any[];
}

@observer
export default class List extends React.Component<any, IState> {
  state = {
    data: [],
    store
  };

  componentDidMount() {
    store.fetchData();
  }

  render() {
    return (
      <Tree
        defaultExpandAll
        showLine
        checkable
        editable
        dataSource={this.state.store.data}
      />
    );
  }
}
