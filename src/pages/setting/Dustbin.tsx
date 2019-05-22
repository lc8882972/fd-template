import * as React from "react";
import {
  ConnectDropTarget,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor
} from "react-dnd";

import Box from "./Box";
import ItemTypes from "./ItemTypes";

const style: React.CSSProperties = {
  height: "12rem",
  width: "12rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "white",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left"
};

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
    <div style={{ ...style, backgroundColor }}>
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
