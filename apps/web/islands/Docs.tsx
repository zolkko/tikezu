import { Document } from "$lib/types/document.ts";
import Documents from "$islands/Documents.tsx"
import { useState } from "preact/hooks"

export default function Docs() {
  const [items, setItems] = useState<Document[]>([
    { id: '1', title: 'Item 1', subtitle: 'Swipe left to see actions', bookmarked: false },
    { id: '2', title: 'Item 2', subtitle: 'Description 2', bookmarked: true },
    { id: '3', title: 'Item 3', subtitle: 'Description 3', bookmarked: false },
    { id: '4', title: 'Item 4', subtitle: 'Description 4', bookmarked: false },
  ]);

  const handleBookmark = (id: string) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, bookmarked: !item.bookmarked }
        : item
    ));
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <Documents
      items={items}
      onBookmark={handleBookmark}
      onDelete={handleDelete}
    />
  );
}
