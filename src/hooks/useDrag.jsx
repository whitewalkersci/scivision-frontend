import { useCallback, useEffect, useRef, useState } from "react";

export const useDrag = ({ ref, containerRef }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    const draggable = ref.current;
    const container = containerRef?.current;

    if (!draggable || !container) return;

    const dragRect = draggable.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // 🟡 Store the click offset inside the draggable box
    offsetRef.current = {
      x: e.clientX - dragRect.left,
      y: e.clientY - dragRect.top,
      containerRect,
    };

    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !ref.current || !containerRef.current) return;

    const containerRect = offsetRef.current.containerRect;
    const draggableRect = ref.current.getBoundingClientRect();

    const newX = e.clientX - offsetRef.current.x - containerRect.left;
    const newY = e.clientY - offsetRef.current.y - containerRect.top;

    // Clamp position within container bounds
    const maxX = containerRect.width - draggableRect.width;
    const maxY = containerRect.height - draggableRect.height;

    const clampedX = Math.max(0, Math.min(maxX, newX));
    const clampedY = Math.max(0, Math.min(maxY, newY));

    setPosition({ x: clampedX, y: clampedY });
  }, [isDragging, ref, containerRef]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove]);

  return {
    position,
    handleMouseDown,
  };
};
