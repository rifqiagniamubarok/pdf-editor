import React, { useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import classNames from 'classnames';

const ItemTypes = {
  SIGNATURE: 'signature',
};

interface DraggableSignatureProps {
  src: string;
  position: { x: number; y: number };
  width?: number;
  height?: number;
  index: number;
  onDrop: (index: number, position: { x: number; y: number }) => void;
  isSelected?: boolean;
  onClick: () => void;
}

const DraggableSignature: React.FC<DraggableSignatureProps> = ({ src, position, width = 100, height = 50, index, onDrop, isSelected = false, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.SIGNATURE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref);

  useEffect(() => {
    if (isDragging) {
      // Handle dragging logic here
    }
  }, [isDragging]);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width,
        height,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
      className={classNames(isSelected && 'border-2 border-blue-500')}
      onClick={onClick}
    >
      <img src={src} alt="Signature" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default DraggableSignature;
