import express from 'express';
import {Notes} from '../models/notes.model.js'
import checkLoggedIn from '../middleware/authmiddleware.js';


const notesRouter = express.Router();


notesRouter.get("/", checkLoggedIn, async (req, res) => {
  try {
    const username = req.username;
    const userNotes = await Notes.find({ username });
    res.status(200).json({
      success: true,
      userNotes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in fetching notes"
    });
  }
});


 notesRouter.post("/new", checkLoggedIn, async (req, res) => {
    try {
      const { title, body } = req.body;
      const username = req.username;
  
      const newNote = await Notes.create({ title, body, username });
      res.status(201).json({
        success: true,
        newNote 
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Error in creating note"
      });
    }
  });




 notesRouter.put("/edit/:id", checkLoggedIn, async(req, res)=>{
    try {
     await Notes.findByIdAndUpdate(req.params.id,req.body)
     res.status(201).json({
         sucess:true,
     })
    } catch (error) {
     res.status(500).json({
         success: false,
         message: "Error while editing note",
     });
    }
 })


 notesRouter.delete("/delete/:id", checkLoggedIn , async(req, res)=>{
    try {
     await Notes.findByIdAndDelete(req.params.id,req.body)
     res.status(201).json({
         sucess:true,
     })
    } catch (error) {
     res.status(501).json({
         success: false,
         message: "Error in deleting note",
     });
    }
 })


export default notesRouter;

