import Tags from "../Models/TagsModal.js";
import asyncHandler from "express-async-handler";


const getTags = asyncHandler(async (req, res) => {
  try {
    const tags = await Tags.find({});
    res.json(tags);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


const createTags = asyncHandler(async (req, res) => {
  try {
    const { title } = req.body;
    const tag = new Tags({
      title,
    });
    const createdTag = await tag.save();
    res.status(201).json(createdTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


const updateTags = asyncHandler(async (req, res) => {
  try {
    const tag = await Tags.findById(req.params.id);

    if (tag) {
      tag.title = req.body.title || tag.title;
      const updatedTag = await tag.save();
      res.json(updatedTag);
    } else {
      res.status(404).json({ message: "Тег не знайдений" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


const deleteTags = asyncHandler(async (req, res) => {
  try {
    const category = await Tags.findById(req.params.id);

    if (category) {
      await category.remove();
      res.json({ message: "Тег видалено" });
    } else {
      res.status(404).json({ message: "Тег не знайдений" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { getTags, createTags, updateTags, deleteTags };
