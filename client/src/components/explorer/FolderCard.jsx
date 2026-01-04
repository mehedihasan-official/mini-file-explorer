export default function FolderCard({ folder, onOpen, onRename, onDelete }) {
  return (
    <div className="border p-3 rounded flex justify-between">
      <span
        className="cursor-pointer font-semibold"
        onClick={() => onOpen(folder)}
      >
        📁 {folder.name}
      </span>

      <div className="space-x-2">
        <button onClick={() => onRename(folder)}>✏️</button>
        <button onClick={() => onDelete(folder._id)}>🗑️</button>
      </div>
    </div>
  );
}
