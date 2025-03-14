import type { Book } from '../models/Book';
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

export function getBookByTitle(title:string): Promise<Book[]> {
    const filteredBooks = books.filter((book) => book.title.toLowerCase().startsWith(title.toLowerCase()));
    return Promise.resolve(filteredBooks);
}

export function getAllBooks(): Promise<Book[]> {
    return Promise.resolve(books);
}

export function getBookById(id: number): Promise<Book | undefined> {
     return Promise.resolve(books.find((book) => book.id === id));
}

export function updateBookById(id: number, updateBook: Book): Promise<string> {
    const bookIndex = books.findIndex(book => book.id === id)
    if (bookIndex === -1) {
        return Promise.resolve("Book not found") 
    }
    books[bookIndex] = { ...books[bookIndex], ...updateBook };

    return Promise.resolve("Book updated successfully")
}

export function addBook(newBook: Book): Promise<Book> {
    newBook.id = books.length + 1;
    books.push(newBook);
    return Promise.resolve(newBook);
}