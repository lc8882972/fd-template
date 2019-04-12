import * as React from "react";
import {
  DragSource,
  DragSourceMonitor,
  ConnectDragSource,
  DragSourceConnector
} from "react-dnd";
import ItemTypes from "./ItemTypes";

const style: React.CSSProperties = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move",
  float: "left"
};

export interface BoxProps {
  name: string;
  index: number;
  // Collected Props
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
}
const Box: React.FC<BoxProps> = ({
  name,
  index,
  isDragging,
  connectDragSource
}) => {
  const opacity = isDragging ? 0.4 : 1;
  return connectDragSource(
    <div style={{ ...style, opacity }}>{name + index}</div>
  );
};

export default DragSource(
  ItemTypes.BOX,
  {
    beginDrag: (props: BoxProps) => {
      return { name: props.name, index: props.index };
    },
    endDrag(props: BoxProps, monitor: DragSourceMonitor) {
      const item = monitor.getItem();
      console.log(item);
      // const dropResult = monitor.getDropResult();

      // if (dropResult) {
      //   alert(`You dropped ${item.name} into ${dropResult.name}!`);
      // }
    }
  },
  (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(Box);
