import * as React from 'react';
import { Tab, Button } from '@alifd/next';
import Form from '../form';
import * as styles from './index.module.scss';
interface IProps {
  pageConditions: any[],
  onSubmitForm: (values: any) => void
}
const types = new Map<string, string>();
const { useCallback, useState } = React;
types.set('input', 'string');
function toJsonSchame(array: any[]) {
  const schame = {
    type: "object",
    properties: {}
  };

  array
    .map(item => {
      const v = {
        type: types.get(item.inputType),
        title: item.caption,
        enum: undefined
      }
      if (Array.isArray(item.options)) {
        v.enum = item.options
      }

      const descriptor = {
        value: v,
        writable: true,
        enumerable: true,
        configurable: true
      };

      Object.defineProperty(schame.properties, item.name, descriptor);
    });
  return schame;
}

function Loop({ conditions, onSubmitForm }: any) {
  const [formValue, setForm] = useState<object>({ name: '', caption: '' });
  const onFormChange = useCallback((values: object) => {
    setForm(values);
  }, []);

  const resetForm = () => {
    setForm({ name: '', caption: '' });
  };

  const submitForm = () => {
    onSubmitForm(formValue);
  };

  return (
    <div>
      <Form jsonSchema={toJsonSchame(conditions.parameters)} value={formValue} onFormChange={onFormChange} />
      <div>
        <Button type="normal" onClick={() => resetForm()}>重置</Button>
        <Button style={{ marginLeft: '20px' }} type="primary" onClick={() => submitForm()}>确定</Button>
      </div>
    </div>
  )
}

function filterForm({ pageConditions, onSubmitForm }: IProps) {
  const conditions = pageConditions.filter(item => item.type !== '0');
  const [tabKey, setTabKey] = useState(0);

  const tabChange = (keys: any) => {
    setTabKey(keys);
  }

  return (
    <div className={styles.filter}>
      <Tab contentClassName={styles.content} defaultActiveKey={0} activeKey={tabKey} onChange={tabChange}>
        {
          conditions.map((item: any, i: number) => {
            return (
              <Tab.Item key={i} title={item.name}>
                {
                  <Loop conditions={item} onSubmitForm={onSubmitForm} />
                }
              </Tab.Item>)
          })
        }
      </Tab>

    </div >)
}

export default filterForm;
