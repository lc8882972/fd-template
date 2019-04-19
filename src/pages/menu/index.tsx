import * as React from "react";
import { Tree } from "@alifd/next";
import axios from "axios";


function findChild(curr: any, all: any[]) {
  curr.children = all.filter(f => f.parent === curr.id);
  curr.key = curr.id.toString();
  curr.label = curr.description;
  curr.children.forEach((e: any) => {
    findChild(e, all);
  });
}

function adapter(arr:any[]){
  const newData =[];

  arr.forEach(l => {

    findChild(l, arr);
  });

  for(let i=0; i < arr.length;i++){
    if(arr[i].parent === null){
      newData.push(arr[i]);
      findChild(arr[i], arr);
    }
  }

  return newData;
}

interface IState {
  data: any[];
}

export default class List extends React.Component<any, IState> {
  state = {
    data: []
  };

  fetchData = () => {
    const self = this;
    axios.get("/mock/menu.json").then(resp => {
      const tempData =adapter(resp.data);
      console.log(tempData);
      self.setState({ data: tempData });
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <Tree
        defaultExpandAll
        showLine
        checkable
        editable
        dataSource={this.state.data}
      />
    );
  }
}
