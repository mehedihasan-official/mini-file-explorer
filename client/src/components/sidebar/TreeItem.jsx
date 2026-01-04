import { useState } from "react";

export default function TreeItem({ node, onSelect }) {
  const [open, setOpen] = useState(false);

  if (node.type !== "folder") return null;

  return (
    <div className="ml-2">
      <div
        className="cursor-pointer flex items-center gap-1"
        onClick={() => {
          setOpen(!open);
          onSelect(node);
        }}
      >
        {open ? "📂" : "📁"} {node.name}
      </div>

      {open &&
        node.children?.map((child) => (
          <TreeItem
            key={child._id}
            node={child}
            onSelect={onSelect}
          />
        ))}
    </div>
  );
}
