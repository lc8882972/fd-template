import * as React from "react";
import {
  ConnectDragSource,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  ConnectDropTarget,
} from "react-dnd";
import ItemTypes from "./ItemTypes";
const { useRef, useImperativeHandle } = React;

const style: React.CSSProperties = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move"
};

export interface IBoxProps {
  id: any;
  name: string;
  index: number;
  type: string,
  description: string,
  backgroundColor: string
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
  connectDropTarget: ConnectDropTarget;
}
export interface IBoxInstance {
  name: string;
  index: number;
  backgroundColor: string;
}

export interface IBoxDOMInstance {
  getNode(): HTMLDivElement | null;
}

const Box: React.RefForwardingComponent<
  HTMLDivElement,
  IBoxProps
> = React.forwardRef(
  (
    { name, backgroundColor, isDragging, connectDragSource }: IBoxProps,
    ref
  ) => {
    const elementRef = useRef(null);
    connectDragSource(elementRef);

    const opacity = isDragging ? 0 : 1;
    useImperativeHandle<{}, IBoxDOMInstance>(ref, () => ({
      getNode: () => elementRef.current
    }));
    return (
      <div ref={elementRef} style={{ ...style, backgroundColor, opacity }}>
        {name}
      </div>
    );
  }
);

export default DragSource(
  ItemTypes.BOX,
  {
    beginDrag: ({ name, type, description }: IBoxProps) => {
      return { name, type, description };
    },
  },
  (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(Box);

