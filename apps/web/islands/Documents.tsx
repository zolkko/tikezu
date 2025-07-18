import { FunctionalComponent } from 'preact';
import DocumentComponent from "../components/Document.tsx"
import { type Document } from "$lib/types/document.ts";

interface DocumentsProps {
  items: Document[];
  onBookmark: (id: string) => void;
  onDelete: (id: string) => void;
}

const Documents: FunctionalComponent<DocumentsProps> = (props: DocumentsProps) => {
  return (
    <div
      className="flex-1 overflow-y-auto overscroll-bounce"
      style={{
        WebkitOverflowScrolling: 'touch',
        paddingBottom: '50px'
      }}
    >
      {props.items.map((item) => (
        <DocumentComponent
          key={item.id}
          item={item}
          onBookmark={props.onBookmark}
          onDelete={props.onDelete}
        />
      ))}
    </div>
  );
};

export default Documents;