import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';

const ItemTypes = {
  SIGNATURE: 'signature',
};

interface DropAreaProps {
  children: React.ReactNode;
  onDrop: (index: number, offset: { x: number; y: number }) => void;
}

const DropArea: React.FC<DropAreaProps> = ({ children, onDrop }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.SIGNATURE,
    drop: (item: { index: number }, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset) {
        onDrop(item.index, offset);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  drop(ref);

  const isActive = canDrop && isOver;

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        position: 'relative',
      }}
      className="bg-white drop-area border h-fit"
    >
      {children}
    </div>
  );
};

export default DropArea;
