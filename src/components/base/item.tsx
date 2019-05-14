import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Switch,
  Upload
} from "@alifd/next";
import * as React from "react";
// import * as moment from 'moment';
const FormItem = Form.Item;
// moment.locale('zh-cn');

interface IItemProps {
  data: any;
  init: any;
}
const formItemLayout = {
  labelCol: { fixedSpan: 6 },
  wrapperCol: { span: 14 }
};
class Item extends React.Component<IItemProps> {
  public render() {
    const { data, init } = this.props;
    switch (data.type) {
      case "input":
        {
          return (
            <FormItem {...formItemLayout} label={data.label}>
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
            <FormItem {...init(data.name)} {...formItemLayout} label={data.label}>
              <DatePicker value='2019-04-11'/>
            </FormItem>
          );
        }
        break;
      case "select":
        {
          return (
            <FormItem {...formItemLayout} label={data.label}>
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
            <FormItem {...formItemLayout} label={data.label}>
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
            <FormItem {...formItemLayout} label={data.label}>
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
            <FormItem {...formItemLayout} label={data.label}>
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
            <FormItem {...formItemLayout} label={data.label}>
              <Switch defaultChecked={true} />
            </FormItem>
          );
        }
        break;
    }

    return null;
  }
}

export default Item;
