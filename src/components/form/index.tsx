import * as React from 'react';
import {
  SchemaForm,
  createFormActions
} from '@uform/next';
// import '@alifd/next/dist/next.css';

interface IProps {
  jsonSchema: object,
  value?: object;
}

const actions = createFormActions()
export default function uform({ jsonSchema, value }: IProps) {
  return (
    <div style={{ width: '500px' }}>
      <SchemaForm
        schema={jsonSchema}
        actions={actions}
        labelCol={5}
        wrapperCol={17}
        value={value}
      />
    </div>
  )
}








