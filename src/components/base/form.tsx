import {
  Checkbox,
  DatePicker,
  Field,
  Form,
  Input,
  Radio,
  Select,
  Switch,
  Upload
} from "@alifd/next";
import * as React from "react";
import Item from "./item";

interface IFromProps {
  dataSource: any[];
}

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { fixedSpan: 6 },
  wrapperCol: { span: 14 }
};
function renderFromItem(data: any, init: (name: string, options?: any) => void) {

  switch (data.type) {
    case "input":
      {
        return (
          <FormItem label={data.label} key={data.id}>
            <Input
              {...init(data.name, { initValue: "test" })}
              htmlType={data.htmlType}
              name={data.name}
              placeholder={data.placeholder}
            />
          </FormItem>
        );
      }
      break;
    case "date":
      {
        return (
          <FormItem {...init(data.name)} key={data.id} label={data.label}>
            <DatePicker value='2019-04-11' />
          </FormItem>
        );
      }
      break;
    case "select":
      {
        return (
          <FormItem key={data.id} label={data.label}>
            <Select dataSource={data.dataSource}>
              {/* {data.options.map((item:any,i:number)=><option value={item.value} key={i}>{item.text}</option>)} */}
            </Select>
          </FormItem>
        );
      }
      break;
    case "checkbox":
      {
        return (
          <FormItem key={data.id} label={data.label}>
            <Checkbox.Group
              dataSource={data.options}
              {...init("checkboxgroup", {
                rules: [
                  {
                    required: true,
                    type: "array",
                    message: "choose one please"
                  }
                ],
                valueName: "checked"
              })}
            />
          </FormItem>
        );
      }
      break;
    case "radio":
      {
        return (
          <FormItem key={data.id} label={data.label}>
            <Radio.Group name="radio">
              <Radio value="apple">apple</Radio>
              <Radio value="banana">banana</Radio>
              <Radio disabled={true} value="cherry">
                cherry（disabled）
                </Radio>
            </Radio.Group>
          </FormItem>
        );
      }
      break;
    case "upload":
      {
        return (
          <FormItem key={data.id} label={data.label}>
            <Upload
              action={data.action}
              shape="card"
              style={{ display: "inline-block" }}
            >
              Upload File
              </Upload>
          </FormItem>
        );
      }
      break;
    case "switch":
      {
        return (
          <FormItem key={data.id} label={data.label}>
            <Switch defaultChecked={true} />
          </FormItem>
        );
      }
      break;
  }

  return null;

}

class From extends React.Component<IFromProps> {
  public field = new Field(this, {
    onChange: (name: string, value: any) => {
      this.field.setValue(name, value);
    }
  });


  public render() {
    const { dataSource } = this.props;
    const { init } = this.field;
    return (
      <Form field={this.field} {...formItemLayout}>
        {dataSource.map((item) => {
          return renderFromItem(item, init)
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
          <Form.Reset onClick={this.field.reset}>Reset</Form.Reset>
        </Form.Item>
      </Form>
    );
  }
}

export default From;
