import express, { Request, Response} from 'express'
import { getAllBooks, getBookByTitle, getBookById, addBook, updateBookById } from
"./services/BookService";
import type { Book } from "./models/Book";
const app = express()
app.use(express.json()) 
const port = 3000
    
app.get("/books", async (req: Request, res: Response) => {
    if (req.query.title) {
        const searchTitle:string = req.query.title as string
        const filteredBooks = await getBookByTitle(searchTitle)
    
        res.json(filteredBooks);
    } else {
        res.json(await getAllBooks())
    }
})
app.get("/books/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const book = await getBookById(id)
    if (book) {
        res.json(book);
    } else {
        res.status(404).send("Book not found");
    }
})
app.post("/books", async (req, res) => {
    const newBook: Book = req.body;
    await addBook(newBook)
    res.json(newBook);
})

app.put("/books/:id", async (req, res) => {
    const bookId = parseInt(req.params.id);
    const updateBook: Book = req.body;
    const updataData = await updateBookById(bookId, updateBook)
    res.json(updataData)
    
    
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})