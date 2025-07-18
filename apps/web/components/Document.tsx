import { FunctionComponent } from "preact";
import { useState, useRef, useEffect } from 'preact/hooks';
import { type Document as DocumentItem } from "$lib/types/document.ts";
import BookmarkIcon from "@preact-icons/tb/TbBookmark";
import TrashIcon from "@preact-icons/tb/TbTrash";

interface DocumentProps {
  item: DocumentItem;
  onBookmark: (id: string) => void;
  onDelete: (id: string) => void;
}

const Document: FunctionComponent<DocumentProps> = ({ item, onBookmark, onDelete }: DocumentProps) => {
  const [offset, setOffset] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;

    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    // Limit the swipe to -150px (showing both buttons)
    const newOffset = Math.max(-150, Math.min(0, -diff));
    setOffset(newOffset);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // Snap to closest position
    if (offset < -75) {
      setOffset(-150); // Fully open
    } else {
      setOffset(0); // Close
    }
  };

  const reset = () => {
    setOffset(0);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(e.target as Node)) {
        reset();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative overflow-hidden" ref={itemRef}>
      <div
        className="bg-white relative z-10 touch-pan-x"
        style={{
          transform: `translateX(${offset}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="text-base font-medium text-gray-900">{item.title}</div>
          {item.subtitle && (
            <div className="text-sm text-gray-500">{item.subtitle}</div>
          )}
        </div>
      </div>

      <div
        className="absolute right-0 top-0 h-full flex"
        style={{
          transform: `translateX(${offset + 150}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        }}
      >
        <button
          className="w-[75px] bg-orange-500 flex items-center justify-center"
          onClick={() => {
            onBookmark(item.id);
            reset();
          }}
        >
          <BookmarkIcon className="text-white" size={24} />
        </button>
        <button
          className="w-[75px] bg-red-500 flex items-center justify-center"
          onClick={() => {
            onDelete(item.id);
            reset();
          }}
        >
          <TrashIcon className="text-white" size={24} />
        </button>
      </div>
    </div>
  );
};

export default Document;