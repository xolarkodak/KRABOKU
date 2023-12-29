import express from "express";
import * as tagsController from "../Controllers/TagsController.js";
import { protect, admin } from "../middlewares/Auth.js";

const router = express.Router();

router.get("/", tagsController.getTags);


router.post("/", protect, admin, tagsController.createTags);
router.put("/:id", protect, admin, tagsController.updateTags);
router.delete("/:id", protect, admin, tagsController.deleteTags);

export default router;
