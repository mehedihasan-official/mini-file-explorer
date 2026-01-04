import TreeItem from "./TreeItem";

export default function Sidebar({ tree, onSelect }) {
  return (
    <aside className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
      <h2 className="font-bold mb-3">📁 Explorer</h2>

      {tree.map((node) => (
        <TreeItem
          key={node._id}
          node={node}
          onSelect={onSelect}
        />
      ))}
    </aside>
  );
}
