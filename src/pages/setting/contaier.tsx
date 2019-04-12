import * as React from 'react'
import Dustbin from './Dustbin'
import Box from './Box'

const rowStyle: React.CSSProperties = { overflow: 'hidden', clear: 'both' }

const Container: React.FC = () => (
  <div>
    <div style={rowStyle}>
      <Dustbin />
    </div>
    <div style={rowStyle}>
      <Box name="Glass" index="0"/>
      <Box name="Banana" index="1"/>
      <Box name="Paper" index="2"/>
    </div>
  </div>
)

export default Container
