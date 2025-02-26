import * as bookServices from "../services/bookServices.js";
import { logMessage } from "../logger.js"; // Import logger

export const getBooks = async (req, res) => {
    try {
        const searchTerm = req.query.q;
        
        if (searchTerm) {
            logMessage("info", "Books", `Searching for books with term: ${searchTerm}`);
            const booksFound = await bookServices.searchBook(searchTerm);
            return res.status(200).json(booksFound);
        } else {
            logMessage("info", "Books", "Fetching all books");
            const books = await bookServices.getBooks();
            return res.status(200).json(books);
        }
    } catch (err) {
        logMessage("error", "Books", `Error fetching/searching books: ${err.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getBookById = async (req, res) => {
    try {
        const bookId = req.params.id;
        logMessage("info", "Books", `Fetching book with ID: ${bookId}`);

        const book = await bookServices.getBookById(bookId);
        if (!book) {
            logMessage("warn", "Books", `Book with ID ${bookId} not found`);
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(book);
    } catch (err) {
        logMessage("error", "Books", `Error fetching book by ID: ${err.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const addBook = async (req, res) => {
    try {
        const bookData = req.body;
        logMessage("info", "Books", `Adding new book: ${JSON.stringify(bookData)}`);

        const newBook = await bookServices.addBook(bookData);
        res.status(201).json(newBook);
    } catch (err) {
        logMessage("error", "Books", `Error adding new book: ${err.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const bookData = req.body;
        logMessage("info", "Books", `Updating book with ID: ${bookId}`);

        const updatedBook = await bookServices.updateBook(bookData, bookId);
        if (!updatedBook) {
            logMessage("warn", "Books", `Book with ID ${bookId} not found for update`);
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(updatedBook);
    } catch (err) {
        logMessage("error", "Books", `Error updating book: ${err.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        logMessage("info", "Books", `Deleting book with ID: ${bookId}`);

        const deletedBook = await bookServices.deleteBook(bookId);
        if (!deletedBook) {
            logMessage("warn", "Books", `Book with ID ${bookId} not found for deletion`);
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(deletedBook);
    } catch (err) {
        logMessage("error", "Books", `Error deleting book: ${err.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
