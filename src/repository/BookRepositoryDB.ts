import type { Book } from "../models/Book";
import connection from "../db";

export async function getBookByTitle(title: string): Promise<Book[]>
{
    const [rows] = await connection.execute('SELECT * FROM books WHERE title = ?', [title]);
    return rows as Book[];
}

export async function getAllBooks(): Promise<Book[]> {
    const [rows] = await connection.execute('SELECT * FROM books');
    return rows as Book[];
}

export async function getBookById(id: number): Promise<Book | undefined> {
    const [rows] = await connection.execute('SELECT * FROM books WHERE id =?', [id]);
    const books = rows as Book[];
    return books.length > 0 ? books[0] : undefined;
}

export async function addBook(newBook: Book): Promise<Book> {
    const { title, Author_name, description, groups } = newBook;
    const [result] = await connection.execute(
        'INSERT INTO books (title, Author_name, description, book_groups) VALUES (?, ?, ?, ?)',
        [title, Author_name, description, groups ]
    );
    newBook.id = (result as any).insertId;
    return newBook;
}

export async function updateBookById(id: number, updateBook: Book): Promise<string> {
    const oldBook = await getBookById(id);
    const { title, Author_name, description, groups } = updateBook;
    if ( oldBook === undefined) {
        return "Book not found"
    }
    const [result] = await connection.execute(
        'UPDATE books SET title = ?, Author_name = ?, description = ?, book_groups= ? WHERE id = ?',
        [title, Author_name, description, groups, id ]
    );

    return "Book updated successfully"
}