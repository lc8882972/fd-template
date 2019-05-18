import * as React from "react";
import {
  ConnectDropTarget,
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor
} from "react-dnd";
import update from "immutability-helper";
import Box, { BoxInstance } from "./Box";
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
  canDrop: boolean;
  isOver: boolean;
  connectDropTarget: ConnectDropTarget;
}

interface IDustbinState {
  list: BoxInstance[];
}

class Dustbin extends React.Component<IDustbinProps, IDustbinState> {
  constructor(porps: IDustbinProps) {
    super(porps);
    this.state = {
      list: []
    };
  }

  public add = (item: BoxInstance): void => {
    if (item && this.state.list.some((i: any) => i.name === item.name)) {
      return;
    }
    const list = this.state.list.slice();
    item.index = this.state.list.length;
    list.push(item);

    this.setState({ list });
  };

  public moveCard = (dragIndex: number, hoverIndex: number) => {
    const list = this.state.list;
    const dragCard = list[dragIndex];
    const newList = update(list, {
      $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
    });

    this.setState({ list: newList });
  };

  public render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;
    let backgroundColor = "#222";
    if (isActive) {
      backgroundColor = "darkgreen";
    } else if (canDrop) {
      backgroundColor = "darkkhaki";
    }

    return connectDropTarget(
      <div style={{ ...style, backgroundColor }}>
        {this.state.list.map((item, i) => {
          return (
            <Box name={item.name} key={i} index={i} moveCard={this.moveCard} />
          );
        })}
      </div>
    );
  }
}

export default DropTarget(
  ItemTypes.BOX,
  {
    drop: (props: any, monitor, component: Dustbin) => {
      if (!component) {
        return null;
      }
      console.log("drop", monitor.getItem());
      const list = component.state.list;
      component.add(monitor.getItem());
      // if (component.add(monitor.getItem())) {
      return { name: "Dustbin", index: list.length };
      // }

      // return undefined;
    },
    hover: (props: any, monitor, component) => {
      if (!component) {
        return null;
      }
      return undefined;
    }
  },
  (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })
)(Dustbin);
