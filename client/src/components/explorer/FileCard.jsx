export default function FileCard({ file, onRename, onDelete }) {
  return (
    <div className="border p-3 rounded flex justify-between">
      <span>
        {file.mimeType?.startsWith("image")
          ? "🖼️"
          : "📄"}{" "}
        {file.name}
      </span>

      <div className="space-x-2">
        <button onClick={() => onRename(file)}>✏️</button>
        <button onClick={() => onDelete(file._id)}>🗑️</button>
      </div>
    </div>
  );
}
