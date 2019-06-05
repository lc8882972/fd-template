import * as React from "react";
import {
  ConnectDropTarget,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor
} from "react-dnd";

import Box from "./Card";
import ItemTypes from "./ItemTypes";
import * as styles from './index.module.scss';

interface IDustbinProps {
  fields: any[],
  addField: (field: any) => void,
  moveField: (id: string, atIndex: number) => void,
  removeField: (field: any) => void,
  canDrop: boolean;
  isOver: boolean;
  connectDropTarget: ConnectDropTarget;
}

function Dustbin({ fields, moveField, canDrop, isOver, connectDropTarget }: IDustbinProps) {

  const isActive = canDrop && isOver;
  let backgroundColor = "#222";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }


  return connectDropTarget(
    <div className={styles.dustbin} style={{ backgroundColor }}>
      {fields.map((item: any, i: number) => {
        return (
          <Box key={i} index={i} {...item} />
        );
      })}
    </div>
  );
}

export default DropTarget(
  ItemTypes.BOX,
  {
    drop: (props: any, monitor, component) => {

      const { addField, name, type, description } = props;
      addField(monitor.getItem());

      return { name, type, description };

    }
  },
  (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })
)(Dustbin);
