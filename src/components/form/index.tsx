import * as React from 'react';
import {
  SchemaForm,
  createFormActions
} from '@uform/next';
import classnames from 'classnames';
// import '@alifd/next/dist/next.css';
import * as styles from './index.module.scss';

interface IProps {
  jsonSchema: object,
  value?: object;
  className?: string,
  style?: any,
  onFormChange?: (values: object) => void;
}

const actions = createFormActions()
export default function uform({ jsonSchema, value, onFormChange, className, style }: IProps) {

  return (
    <div>
      <SchemaForm
        className={classnames(styles.form, className)}
        style={style}
        schema={jsonSchema}
        actions={actions}
        editable={true}
        inline={true}
        initialValues={value}
        onChange={onFormChange}
        // labelCol={5}
        // wrapperCol={17}
      />
    </div>
  )
}








