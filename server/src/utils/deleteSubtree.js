/**
 * Delete Subtree
 * Recursively delete a node and all its descendants
 */

const Node = require('../models/Node.model');
const fs = require('fs').promises;
const path = require('path');
const config = require('../config/env');

/**
 * Delete a node and all its descendants recursively
 * Also deletes associated image files from filesystem
 * @param {ObjectId} nodeId - ID of node to delete
 * @returns {Promise<number>} Number of nodes deleted
 */
const deleteSubtree = async (nodeId) => {
  let deletedCount = 0;

  // Find the node
  const node = await Node.findById(nodeId);
  if (!node) {
    return deletedCount;
  }

  // If it's a folder, recursively delete all children
  if (node.isFolder()) {
    const children = await Node.find({ parentId: nodeId });
    
    for (const child of children) {
      deletedCount += await deleteSubtree(child._id);
    }
  }

  // If it's an image, delete the file from filesystem
  if (node.type === 'image' && node.imageUrl) {
    try {
      const imagePath = path.join(process.cwd(), node.imageUrl);
      await fs.unlink(imagePath);
      console.log(`🗑️  Deleted image file: ${node.imageUrl}`);
    } catch (error) {
      console.error(`Failed to delete image file: ${node.imageUrl}`, error.message);
      // Continue with deletion even if file deletion fails
    }
  }

  // Delete the node itself
  await Node.findByIdAndDelete(nodeId);
  deletedCount++;

  return deletedCount;
};

/**
 * Delete multiple nodes and their subtrees
 * @param {Array<ObjectId>} nodeIds - Array of node IDs to delete
 * @returns {Promise<number>} Total number of nodes deleted
 */
const deleteMultipleSubtrees = async (nodeIds) => {
  let totalDeleted = 0;

  for (const nodeId of nodeIds) {
    totalDeleted += await deleteSubtree(nodeId);
  }

  return totalDeleted;
};

/**
 * Delete all orphaned nodes (nodes whose parent no longer exists)
 * @returns {Promise<number>} Number of orphaned nodes deleted
 */
const deleteOrphanedNodes = async () => {
  const allNodes = await Node.find({ parentId: { $ne: null } });
  let deletedCount = 0;

  for (const node of allNodes) {
    const parentExists = await Node.exists({ _id: node.parentId });
    if (!parentExists) {
      await deleteSubtree(node._id);
      deletedCount++;
    }
  }

  return deletedCount;
};

module.exports = {
  deleteSubtree,
  deleteMultipleSubtrees,
  deleteOrphanedNodes
};