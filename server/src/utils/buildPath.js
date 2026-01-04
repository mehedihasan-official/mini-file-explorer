import Node from "../models/Node.model.js";

/**
 * Builds a materialized path for a node
 * Example: /rootId/folderId
 */
const buildPath = async (parentId) => {
  if (!parentId) return "";

  const parentNode = await Node.findById(parentId);
  if (!parentNode) throw new Error("Parent folder not found");

  return parentNode.path + "/" + parentNode._id.toString();
};

export default buildPath;
