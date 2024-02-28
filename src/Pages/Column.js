import React, { useEffect, useState } from 'react';
import Item from "./Item";
import { Droppable } from 'react-beautiful-dnd';

const Column = ({ column, items }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <div className="container">
      <p className="title">{column.title}</p>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="items_list"
          >
            {items.map((item, index) => <Item key={item.id} item={item} index={index} />)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
