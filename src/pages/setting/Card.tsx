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
  backgroundColor: string
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
  connectDropTarget: ConnectDropTarget;
  moveField: (dragIndex: number, hoverIndex: number) => void;
  findField: (id: string) => any
  addField: (field: any) => void;
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
    { name, backgroundColor, isDragging, connectDragSource, connectDropTarget }: IBoxProps,
    ref
  ) => {
    const elementRef = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);

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

export default DropTarget(
  ItemTypes.BOX,
  {
    canDrop: () => false,
    hover(props: IBoxProps, monitor: DropTargetMonitor) {
      const { id: draggedId } = monitor.getItem()
      const { id: overId } = props

      if (draggedId !== overId) {
        const { index: overIndex } = props.findField(overId)
        props.moveField(draggedId, overIndex)
      }
    },
  },
  (connect: DropTargetConnector) => ({
    connectDropTarget: connect.dropTarget()
  })
)(
  DragSource(
    ItemTypes.BOX,
    {
      beginDrag: (props: IBoxProps) => ({
        id: props.id,
        originalIndex: props.findField(props.id).index,
      }),
      endDrag(props: IBoxProps, monitor: DragSourceMonitor) {
        const { id: droppedId, originalIndex } = monitor.getItem()
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          props.moveField(droppedId, originalIndex)
        }
      },
    },
    (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  )(Box)
);
