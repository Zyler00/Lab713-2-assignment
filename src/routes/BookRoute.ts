import express, { Request, Response } from "express";
import { getAllBooks, getBookByTitle, getBookById, addBook, updateBookById } from "../services/BookService";
import type { Book } from "../models/Book";
import exp from "constants";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    if (req.query.title) {
        const searchTitle:string = req.query.title as string
        const filteredBooks = await getBookByTitle(searchTitle)
    
        res.json(filteredBooks);
    } else {
        res.json(await getAllBooks())
    }
})
router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const book = await getBookById(id)
    if (book) {
        res.json(book);
    } else {
        res.status(404).send("Book not found");
    }
})
router.post("/", async (req, res) => {
    const newBook: Book = req.body;
    await addBook(newBook)
    res.json(newBook);
})

router.put("/:id", async (req, res) => {
    const bookId = parseInt(req.params.id);
    const updateBook: Book = req.body;
    const updataData = await updateBookById(bookId, updateBook)
    res.json(updataData)
    
    
})

export default router;