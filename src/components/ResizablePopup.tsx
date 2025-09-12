import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ResizablePopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
  minWidth?: number;
  minHeight?: number;
}

export const ResizablePopup: React.FC<ResizablePopupProps> = ({
  isOpen,
  onClose,
  title,
  children,
  defaultWidth = 800,
  defaultHeight = 600,
  minWidth = 400,
  minHeight = 300,
}) => {
  const [dimensions, setDimensions] = useState({ width: defaultWidth, height: defaultHeight });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [resizeHandle, setResizeHandle] = useState('');
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Center the popup when it opens
      const centerX = (window.innerWidth - dimensions.width) / 2;
      const centerY = (window.innerHeight - dimensions.height) / 2;
      setPosition({ x: centerX, y: centerY });
    }
  }, [isOpen, dimensions.width, dimensions.height]);

  const handleMouseDown = (e: React.MouseEvent, handle: string) => {
    e.preventDefault();
    setIsResizing(true);
    setResizeHandle(handle);
  };

  const handleHeaderMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing) {
        const rect = popupRef.current?.getBoundingClientRect();
        if (!rect) return;

        let newWidth = dimensions.width;
        let newHeight = dimensions.height;
        let newX = position.x;
        let newY = position.y;

        if (resizeHandle.includes('right')) {
          newWidth = Math.max(minWidth, e.clientX - rect.left);
        }
        if (resizeHandle.includes('left')) {
          const newWidthCalc = rect.right - e.clientX;
          if (newWidthCalc >= minWidth) {
            newWidth = newWidthCalc;
            newX = e.clientX;
          }
        }
        if (resizeHandle.includes('bottom')) {
          newHeight = Math.max(minHeight, e.clientY - rect.top);
        }
        if (resizeHandle.includes('top')) {
          const newHeightCalc = rect.bottom - e.clientY;
          if (newHeightCalc >= minHeight) {
            newHeight = newHeightCalc;
            newY = e.clientY;
          }
        }

        setDimensions({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
      } else if (isDragging) {
        setPosition({
          x: e.clientX - dimensions.width / 2,
          y: e.clientY - 20, // Offset for header
        });
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setIsDragging(false);
      setResizeHandle('');
    };

    if (isResizing || isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = isResizing ? getResizeCursor(resizeHandle) : 'grabbing';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isResizing, isDragging, resizeHandle, dimensions, position, minWidth, minHeight]);

  const getResizeCursor = (handle: string) => {
    if (handle.includes('top') && handle.includes('left')) return 'nw-resize';
    if (handle.includes('top') && handle.includes('right')) return 'ne-resize';
    if (handle.includes('bottom') && handle.includes('left')) return 'sw-resize';
    if (handle.includes('bottom') && handle.includes('right')) return 'se-resize';
    if (handle.includes('top') || handle.includes('bottom')) return 'ns-resize';
    if (handle.includes('left') || handle.includes('right')) return 'ew-resize';
    return 'default';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm">
      <div
        ref={popupRef}
        className="absolute bg-background border rounded-lg shadow-2xl overflow-hidden"
        style={{
          left: position.x,
          top: position.y,
          width: dimensions.width,
          height: dimensions.height,
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-4 border-b bg-muted/30 cursor-grab active:cursor-grabbing"
          onMouseDown={handleHeaderMouseDown}
        >
          <h2 className="text-lg font-semibold">{title}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden" style={{ height: dimensions.height - 60 }}>
          {children}
        </div>

        {/* Resize handles */}
        {/* Corners */}
        <div
          className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize"
          onMouseDown={(e) => handleMouseDown(e, 'top-left')}
        />
        <div
          className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize"
          onMouseDown={(e) => handleMouseDown(e, 'top-right')}
        />
        <div
          className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize"
          onMouseDown={(e) => handleMouseDown(e, 'bottom-left')}
        />
        <div
          className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize"
          onMouseDown={(e) => handleMouseDown(e, 'bottom-right')}
        />

        {/* Edges */}
        <div
          className="absolute top-0 left-3 right-3 h-1 cursor-ns-resize"
          onMouseDown={(e) => handleMouseDown(e, 'top')}
        />
        <div
          className="absolute bottom-0 left-3 right-3 h-1 cursor-ns-resize"
          onMouseDown={(e) => handleMouseDown(e, 'bottom')}
        />
        <div
          className="absolute left-0 top-3 bottom-3 w-1 cursor-ew-resize"
          onMouseDown={(e) => handleMouseDown(e, 'left')}
        />
        <div
          className="absolute right-0 top-3 bottom-3 w-1 cursor-ew-resize"
          onMouseDown={(e) => handleMouseDown(e, 'right')}
        />
      </div>
    </div>
  );
};