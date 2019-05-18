import * as React from 'react';
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ as dnd } from 'react-dnd'
import ItemTypes from './ItemTypes';
const { useDrop } = dnd

export default function myDropTarget() {
  const [collectedProps, drop] = useDrop({
    accept:ItemTypes.BOX,
    drop:(item, monitor)=>{console.log(item)}
  })

  return <div ref={drop}>Drop Target</div>
}
