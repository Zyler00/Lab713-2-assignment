import type { Book } from '../models/Book';
import * as repo from '../repository/BookRepositoryDB';

export function getBookByTitle(title:string): Promise<Book[]> {
    return repo.getBookByTitle(title);
}

export function getAllBooks(): Promise<Book[]> {
    return repo.getAllBooks()
}

export function getBookById(id: number): Promise<Book | undefined> {
     return repo.getBookById(id)
}

export function updateBookById(id: number, updateBook: Book): Promise<string> {
    return repo.updateBookById(id, updateBook)
}

export function addBook(newBook: Book): Promise<Book> {
    return repo.addBook(newBook)
}