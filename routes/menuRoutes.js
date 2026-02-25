const express = require("express");
const router = express.Router();
const Menu = require("../model/Menu");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const newMenu = new Menu({
      name: req.body.name,
      price: Number(req.body.price),
      category: req.body.category,
      description: req.body.description,
      available: req.body.available === 'true',
      image: req.file ? req.file.path : null,
    });

    const savedMenu = await newMenu.save();
    res.status(201).json(savedMenu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      price: Number(req.body.price),
      category: req.body.category,
      description: req.body.description,
      available: req.body.available === 'true',
    };

    if (req.file) {
      updateData.image = req.file.path; // Only update image if new one uploaded
    }

    const updatedMenu = await Menu.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedMenu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMenu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.json({ message: "Menu item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
