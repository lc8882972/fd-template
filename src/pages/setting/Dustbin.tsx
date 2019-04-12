import * as React from "react";
import * as ReactDom from "react-dom";
import {
  DropTarget,
  ConnectDropTarget,
  DropTargetMonitor,
  DropTargetConnector
} from "react-dnd";
import ItemTypes from "./ItemTypes";
import Box from "./Box";

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

export interface DustbinProps {
  canDrop: boolean;
  isOver: boolean;
  connectDropTarget: ConnectDropTarget;
}

const list: any[] = [];
class Dustbin extends React.Component<DustbinProps> {
  add = (item: any): boolean => {
    if (item && list.some(i => i.name === item.name)) {
      return false;
    }

    item.index = list.length;
    list.push(item);

    return true;
  };

  handleDND = (dragIndex: number, hoverIndex: number) => {
    // let tmp = list[dragIndex]; //临时储存文件
    // list.splice(dragIndex, 1); //移除拖拽项
    // list.splice(hoverIndex, 0, tmp); //插入放置项
  };

  render() {
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
        {list.map((item, i) => {
          return <Box name={item.name} key={i} index={i} />;
        })}
      </div>
    );
  }
}

export default DropTarget(
  ItemTypes.BOX,
  {
    drop: (props: any, monitor, component) => {
      if (!component) return null;

      if (component.add(monitor.getItem())) {
        return { name: "Dustbin", index: list.length };
      }

      return undefined
    },
    hover: (props: any, monitor, component) => {
      if (!component) return null;

      console.log(props, monitor.getItem());
      // return { name: "Dustbin", index: list.length };
      // const dragIndex = monitor.getItem().index; //拖拽目标的Index
      // const hoverIndex = props.index; //放置目标Index
      // if (dragIndex === hoverIndex) return null;

      // //如果不做以下处理，则卡片移动到另一个卡片上就会进行交换，下方处理使得卡片能够在跨过中心线后进行交换.
      // const hoverBoundingRect = ReactDom.findDOMNode(
      //   component
      // ).getBoundingClientRect(); //获取卡片的边框矩形
      // const hoverMiddleX =
      //   (hoverBoundingRect.right - hoverBoundingRect.left) / 2; //获取X轴中点
      // const clientOffset = monitor.getClientOffset(); //获取拖拽目标偏移量
      // const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      // if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
      //   // 从前往后放置
      //   return null;
      // }
      // if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
      //   // 从后往前放置
      //   return null;
      // }

      // component.handleDND(dragIndex, hoverIndex);
      // monitor.getItem().index = hoverIndex; //重新赋值index，否则会出现无限交换情况

      // return null;
    }
  },
  (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })
)(Dustbin);
