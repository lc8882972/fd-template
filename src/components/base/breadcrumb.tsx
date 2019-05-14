import { Breadcrumb } from "@alifd/next";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface IProps extends RouteComponentProps<any> {}

class Custom extends React.Component<IProps> {
  public renderItem(path: string) {
    const array = path.split("/").filter(item => item !== "");
    return array.map((item, index) => {
      return (
        <Breadcrumb.Item key={index} link="javascript:void(0);">
          {item}
        </Breadcrumb.Item>
      );
    });
  }

  public render() {
    const { match } = this.props;
    return <Breadcrumb>{this.renderItem(match.path)}</Breadcrumb>;
  }
}

export default withRouter(Custom);
