import React from "react";
import { DragDropContext, Droppable, Draggable, DropResult, ResponderProvided } from "react-beautiful-dnd";
import { CloseOutlined, MoreOutlined } from "@ant-design/icons";

const stCloseIcon: React.CSSProperties = { float: 'right', lineHeight: '28px' };
const stChooseItem = { lineHeight: '28px' };
const getItemStyle = (isDragging: boolean, draggableStyle: React.CSSProperties | undefined): React.CSSProperties => ({
  // some basic styles to make the items look a bit nicer
  padding: '0 12px',
  userSelect: 'none',
  border: '1px solid #d9d9d9',

  // change background colour if dragging
  background: isDragging ? '#69c0ff' : 'white',
  height: "28px",
  margin: '1px',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? '#e6f7fe' : 'white',
  width: '100%',
});

const reorder = (list: string[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

interface DragListProps {
  list: string[];
  onChange: (list: string[]) => void;
  removeItem: (key: string) => void;
}
const DragList = (props: DragListProps) => {
  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const items = reorder(
      props.list,
      result.source.index,
      result.destination?.index || 0
    );
    props.onChange(items);
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {props.list.map((item, index) => (
              <Draggable key={item} draggableId={item} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <div style={stChooseItem} key={item}>
                      <MoreOutlined />
                      {item}
                      <CloseOutlined style={stCloseIcon} onClick={() => props.removeItem(item)} />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default React.memo(DragList);
