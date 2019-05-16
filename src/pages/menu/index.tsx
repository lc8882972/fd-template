import { Tree } from "@alifd/next";
import { observer } from "mobx-react";
import * as React from "react";
import Store from "./store";

const store = new Store();

interface IState {
  data: any[];
}

@observer
export default class List extends React.Component<any, IState> {
  public state = {
    data: [],
    store
  };

  public componentDidMount() {
    store.fetchData();
  }

  public render() {
    return (
      <Tree
        defaultExpandAll={true}
        showLine={true}
        checkable={true}
        editable={true}
        dataSource={this.state.store.data}
      />
    );
  }
}
