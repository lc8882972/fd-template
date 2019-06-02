import * as React from "react";
import "./index.scss";

import { Overlay } from "@alifd/next";
import Form from "../../components/base/form";

interface IState {
  visible: boolean;
  form: any[];
}

class Page2 extends React.Component<any, IState> {
  public btn: HTMLButtonElement | null = null;
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      form: []
    };

    this.getData().then(json => {
      this.setState({ form: json.data });
    });
  }

  public getData = (): Promise<any> => {
    return fetch("/mock/form.json").then(response => {
      return response.json();
    });
  };

  public onClick = () => {
    this.setState({
      visible: true
    });
  };

  public onClose = () => {
    this.setState({
      visible: false
    });
  };

  public render() {
    return (
      <div className="redux-demo-home">
        <div className="words">
          <span>
            当前页面为 只包含 React-Router 的案例页面， 这里是Page2路由页{" "}
          </span>
        </div>

        <button
          onClick={this.onClick}
          ref={ref => {
            this.btn = ref;
          }}
        >
          Open
        </button>
        <Overlay
          visible={this.state.visible}
          safeNode={() => this.btn}
          align="cc cc"
          hasMask={true}
          disableScroll={true}
          onRequestClose={this.onClose}
        >
          <div className="overlay-demo">
            <Form dataSource={this.state.form} />
          </div>
        </Overlay>
      </div>
    );
  }
}

// map state to props
export default Page2;
