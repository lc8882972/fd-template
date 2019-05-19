import * as React from 'react';
import {
  SchemaForm,
  createFormActions
} from '@uform/next';
// import '@alifd/next/dist/next.css';
const jsonschema = {
  "type": "object",
  "properties": {
    "radio": {
      "type": "radio",
      "enum": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
      ],
      "title": "Radio"
    },
    "select": {
      "type": "string",
      "enum": [
        "1",
        "2",
        "3",
        "4"
      ],
      "title": "Select",
      "required": true
    },
    "checkbox": {
      "type": "checkbox",
      "enum": [
        "1",
        "2",
        "3",
        "4"
      ],
      "title": "Checkbox",
      "required": true
    },
    "number": {
      "type": "number",
      "title": "数字选择"
    },
    "boolean": {
      "type": "boolean",
      "title": "开关选择"
    },
    "date": {
      "type": "date",
      "title": "日期选择"
    },
    "daterange": {
      "type": "daterange",
      "default": [
        "2018-12-19",
        "2018-12-19"
      ],
      "title": "日期范围"
    },
    "year": {
      "type": "year",
      "title": "年份"
    },
    "time": {
      "type": "time",
      "title": "时间"
    },
    "upload": {
      "type": "upload",
      "x-props": {
        "listType": "card"
      },
      "title": "卡片上传文件"
    },
    "upload2": {
      "type": "upload",
      "x-props": {
        "listType": "dragger"
      },
      "title": "拖拽上传文件"
    },
    "upload3": {
      "type": "upload",
      "x-props": {
        "listType": "text"
      },
      "title": "普通上传文件"
    },
    "range": {
      "type": "range",
      "x-props": {
        "min": 0,
        "max": 1024,
        "marks": [
          0,
          1024
        ]
      },
      "title": "范围选择"
    },
    "transfer": {
      "type": "transfer",
      "title": "穿梭框"
    },
    "rating": {
      "type": "rating",
      "title": "等级"
    }
  }
};

const actions = createFormActions()
export default function uform() {

  return (
    <SchemaForm
      schema={jsonschema}
      actions={actions}
      labelCol={7}
      wrapperCol={12}
    />
  )
}








