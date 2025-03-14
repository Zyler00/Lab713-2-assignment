import express, { Request, Response} from 'express'
const app = express()
app.use(express.json()) 
const port = 3000

interface Book {
    id: number;
    title: string;
    Author_name: string;
    description: string;
    groups: string;
}

const books: Book[] = [
    {
        id: 1,
        title: "Concert",
        Author_name: "Live Nation",
        description: "A live concert",
        groups: "Music",
    },
    {
        id: 2,
        title: "Marathon",
        Author_name: "NYC Sports",
        description: "Annual city marathon",
        groups: "Sports",
    },
    {
        id: 3,
        title: "Tech Conference",
        Author_name: "TechWorld Inc.",
        description: "A conference on emerging technologies",
        groups: "Tech",
    },
    {
        id: 4,
        title: "Food Festival",
        Author_name: "Gourmet Events",
        description: "A festival featuring food from around the world",
        groups: "Food",
    },
    {
        id: 5,
        title: "Art Exhibition",
        Author_name: "ArtSphere",
        description: "An exhibition showcasing modern art",
        groups: "Art",
    },
    {
        id: 6,
        title: "Broadway Show",
        Author_name: "Broadway Productions",
        description: "A popular Broadway performance",
        groups: "Theatre",
    }
]
    
app.get("/books", (req: Request, res: Response) => {
    if (req.query.title) {
        const searchTitle:string = req.query.title as string
        const filteredBooks = books.filter((book) =>
            book.title.toLowerCase().startsWith(searchTitle.toLowerCase())
        );
    
        res.json(filteredBooks);
    } else {
        res.json(books)
    }
})
app.get("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find((book) => book.id === id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send("Book not found");
    }
})
app.post("/books", (req, res) => {
    const newBook: Book = req.body;
    newBook.id = books.length + 1;
    books.push(newBook);
    res.json(newBook);
})

app.put("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const updateBook: Book = req.body;
    const bookIndex = books.findIndex(book => book.id === bookId);
    if (bookIndex === -1) {
        res.status(404).json({ message: "Book not found" })
    }
    books[bookIndex] = { ...books[bookIndex], ...updateBook };

    res.json({ message: "Book updated successfully", book: books[bookIndex] });
})
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})