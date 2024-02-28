import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Item = ({ item, index }) => {
  return (
    <div>
      <Draggable draggableId={item.id} index={index}>
        {(provided) => (
          <p
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="card"
          >
            {item.content}
          </p>
        )}
      </Draggable>
    </div>
  );
};

export default Item;
