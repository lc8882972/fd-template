import * as React from 'react';
import Dustbin from './Dustbin';

const rowStyle: React.CSSProperties = { overflow: 'hidden', clear: 'both' }

interface IProps {
  fields: any[]
}

const Container: React.FC<IProps> = ({ fields }: IProps) => (
  <div>
    <div style={rowStyle}>
      <Dustbin fields={fields} />
    </div>
  </div>
)

export default Container
