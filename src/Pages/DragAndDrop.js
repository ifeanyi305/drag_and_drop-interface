import React, { useState } from 'react';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';

const initialItems = {
  items: {
    "item-1": { id: 'item-1', content: 'Go to the mall' },
    "item-2": { id: 'item-2', content: 'Buy grocerries' },
    "item-3": { id: 'item-3', content: 'Check the market' },
    "item-4": { id: 'item-4', content: 'see the end product' },
  },
  columns: {
    'column-1': {
      id: "column-1",
      title: "Mall",
      itemIds: ['item-1', 'item-2', 'item-3', 'item-4'],
    },
    'column-2': {
      id: "column-2",
      title: "Shop",
      itemIds: [],
    },
    'column-3': {
      id: "column-3",
      title: "Home",
      itemIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3']
};

const DragAndDrop = () => {
  const [items, setItems] = useState(initialItems);
  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = items.columns[source.droppableId];
    const finish = items.columns[destination.droppableId];

    if (start === finish) {
      const newItemIds = Array.from(start.itemIds);
      newItemIds.splice(source.index, 1);
      newItemIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        itemIds: newItemIds,
      };

      const newState = {
        ...items,
        columns: {
          ...items.columns,
          [newColumn.id]: newColumn,
        },
      };

      setItems(newState);
      return;
    }

   // Move the task from one list to another
    const startItemIds = Array.from(start.itemIds);
    startItemIds.splice(source.index, 1);
    const newStart = {
      ...start,
      itemIds: startItemIds,
    };

    const finishItemIds = Array.from(finish.itemIds);
    finishItemIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      itemIds: finishItemIds,
    };

    const newState = {
      ...items,
      columns: {
        ...items.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setItems(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="content_container">
        {items.columnOrder.map(columnId => {
          const column = items.columns[columnId]
          const catalog = column.itemIds.map(itemId => items.items[itemId])
          return <Column key={column.id} column={column} items={catalog} />
        })}
      </div>
    </DragDropContext>
  )

  // const [items, setItems] = useState(initialItems);

  // const onDragEnd = result => {
  //   if (!result.destination) return;

  //   const reorderedItems = Array.from(items);
  //   const [removed] = reorderedItems.splice(result.source.index, 1);
  //   reorderedItems.splice(result.destination.index, 0, removed);

  //   setItems(reorderedItems);
  // };

  // return (
  //   <DragDropContext onDragEnd={onDragEnd}>
  //     <Droppable droppableId="droppable">
  //       {(provided) => (
  //         <div
  //           ref={provided.innerRef}
  //           {...provided.droppableProps}
  //         >
  //           {items.map((item, index) => (
  //             <Draggable key={item.id} draggableId={item.id} index={index}>
  //               {(provided) => (
  //                 <div
  //                   ref={provided.innerRef}
  //                   {...provided.draggableProps}
  //                   {...provided.dragHandleProps}
  //                 >
  //                   {item.content}
  //                 </div>
  //               )}
  //             </Draggable>
  //           ))}
  //           {provided.placeholder}
  //         </div>
  //       )}
  //     </Droppable>
  //   </DragDropContext>
  // );
}

export default DragAndDrop;
