import * as React from "react";
import {
  ConnectDragSource,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
  ConnectDropTarget,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  XYCoord
} from "react-dnd";
import ItemTypes from "./ItemTypes";
const { useRef, useImperativeHandle } = React;

const style: React.CSSProperties = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move",
};

export interface BoxProps {
  id: any;
  name: string;
  index: number;
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
  connectDropTarget: ConnectDropTarget;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  addBox: (box: any) => void;
}
export interface BoxInstance {
  name: string;
  index: number;
}

export interface BoxDOMInstance {
  getNode(): HTMLDivElement | null;
}

const Box: React.RefForwardingComponent<
  HTMLDivElement,
  BoxProps
> = React.forwardRef(
  (
    { name, isDragging, connectDragSource, connectDropTarget }: BoxProps,
    ref
  ) => {
    const elementRef = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);

    const opacity = isDragging ? 0 : 1;
    useImperativeHandle<{}, BoxDOMInstance>(ref, () => ({
      getNode: () => elementRef.current
    }));
    return (
      <div ref={elementRef} style={{ ...style, opacity }}>
        {name}
      </div>
    );
  }
);

export default DropTarget(
  ItemTypes.BOX,
  {
    hover(props: BoxProps, monitor: DropTargetMonitor, component) {
      if (!component) {
        return null;
      }

      // node = HTML Div element from imperative API
      const node = component.getNode();
      if (!node) {
        return null;
      }

      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = node.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      if(!props.moveCard){
        return null;
      }
      // Time to actually perform the action
      props.moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;

      return null;
    }
  },
  (connect: DropTargetConnector) => ({
    connectDropTarget: connect.dropTarget()
  })
)(
  DragSource(
    ItemTypes.BOX,
    {
      beginDrag: (props: BoxProps) => {
        return { name: props.name, index: props.index };
      },
      endDrag(props: BoxProps, monitor: DragSourceMonitor) {
        // const item = monitor.getItem();
        // console.log(item);
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
  )(Box)
);
