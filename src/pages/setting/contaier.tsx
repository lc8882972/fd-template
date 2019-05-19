import * as React from 'react';
import Dustbin from './Dustbin';

const rowStyle: React.CSSProperties = { overflow: 'hidden', clear: 'both' }

const Container: React.FC = () => (
  <div>
    <div style={rowStyle}>
      <Dustbin />
    </div>
  </div>
)

export default Container
