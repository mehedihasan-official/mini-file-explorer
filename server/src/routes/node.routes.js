import express from "express";
import { createNode, deleteNode, getChildren, updateNode } from "../controllers/node.controllers.js";
import upload from '../middlewares/upload.middleware.js';



const router = express.Router();

router.post("/", upload.single("file"), createNode);
router.get("/:id/children", getChildren);
router.patch("/:id", updateNode);
router.delete("/:id", deleteNode);

export default router;
