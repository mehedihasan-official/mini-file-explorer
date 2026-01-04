import Node from "../models/Node.model.js";
import buildPath from "../utils/buildPath.js";

/**
 * Create folder or file
 */
export const createNode = async (req, res) => {
  try {
    const { name, type, fileType, parent, content } = req.body;

    const path = await buildPath(parent);

    let newNode = {
      name,
      type,
      fileType,
      parent: parent || null,
      path
    };

    if (type === "file") {
      if (fileType === "text") {
        newNode.content = content || "";
      }

      if (fileType === "image" && req.file) {
        newNode.fileUrl = `/uploads/${req.file.filename}`;
      }
    }

    const node = await Node.create(newNode);

    // Update path to include own ID
    node.path = path + "/" + node._id;
    await node.save();

    res.status(201).json(node);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get children of a folder
 */
export const getChildren = async (req, res) => {
  const parentId = req.params.id === "root" ? null : req.params.id;
  const children = await Node.find({ parent: parentId }).sort({
    type: -1,
    name: 1
  });
  res.json(children);
};

/**
 * Rename folder or file / Update text content
 */
export const updateNode = async (req, res) => {
  const { name, content } = req.body;

  const node = await Node.findById(req.params.id);
  if (!node) return res.status(404).json({ message: "Node not found" });

  if (name) node.name = name;
  if (node.fileType === "text" && content !== undefined) {
    node.content = content;
  }

  await node.save();
  res.json(node);
};

/**
 * Delete folder or file (recursive delete)
 */
export const deleteNode = async (req, res) => {
  const node = await Node.findById(req.params.id);
  if (!node) return res.status(404).json({ message: "Node not found" });

  const basePath = node.path + "/" + node._id;

  // Delete children
  await Node.deleteMany({ path: { $regex: `^${basePath}` } });

  // Delete itself
  await Node.findByIdAndDelete(req.params.id);

  res.json({ message: "Deleted successfully" });
};
