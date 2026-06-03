const router = require("express").Router();
const todo = require("../models/todo");


router.get("/" , async (req,res)=>{
  try {
    let todolist = await todo.find().sort({ createdAt: -1 });
    res.json(todolist);
  } catch (err) {
    console.error("GET / error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

router.post("/new", async (req,res)=>{
  try {
    const text = req.body.text;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: "Text is required" });
    }
    const newtodo = new todo({ text: text.trim() });
    const saved = await newtodo.save();
    res.json(saved);
  } catch (err) {
    console.error("POST /new error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id" , async (req,res)=>{
  try {
    const id = req.params.id;
    const todolist = await todo.findByIdAndDelete(id);
    res.json(todolist);
  } catch (err) {
    console.error("DELETE /:id error:", err.message);
    res.status(500).json({ error: err.message });
  }
});


router.patch("/:id" , async (req,res)=>{
  try {
    const id = req.params.id;
    const todolist = await todo.findById(id);
    todolist.completed = !todolist.completed;
    await todolist.save();
    res.json(todolist);
  } catch (err) {
    console.error("PATCH /:id error:", err.message);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
