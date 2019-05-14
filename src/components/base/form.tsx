import { Field, Form } from "@alifd/next";
import * as React from "react";
import Item from "./item";

interface IFromProps {
  dataSource: any[];
}

class From extends React.Component<IFromProps> {
  public field = new Field(this, {
    onChange: (name: string, value: any) => {
      this.field.setValue(name, value);
    }
  });

  // inputChange = (name: string, value: any) => {
  //   console.log(value);
  // };

  public render() {
    const { dataSource } = this.props;
    return (
      <Form field={this.field}>
        {dataSource.map((item, i) => {
          return (
            <Item
              data={item}
              key={i}
              {...this.field}
            />
          );
        })}

        <Form.Item wrapperCol={{ offset: 6 }}>
          <Form.Submit
            validate={true}
            type="primary"
            onClick={(v, e) => console.log(v, e)}
            style={{ marginRight: 10 }}
          >
            Submit
          </Form.Submit>
          <Form.Reset>Reset</Form.Reset>
        </Form.Item>
      </Form>
    );
  }
}

export default From;
