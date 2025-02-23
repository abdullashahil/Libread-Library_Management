import * as bookServices from "../services/bookServices.js";

export const getBooks = async (req, res) => {
    try {
      const searchTerm = req.query.q;
  
      if (searchTerm) {
        // If ?q= is present, do a search
        const booksFound = await bookServices.searchBook(searchTerm);
        return res.status(200).json(booksFound);
      } else {
        // Otherwise, get all books
        const books = await bookServices.getBooks();
        return res.status(200).json(books);
      }
    } catch (err) {
      console.error('Error fetching/searching books:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

export const getBookById = async (req, res) => {
    try {
      const bookId = req.params.id;
      const book = await bookServices.getBookById(bookId);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.status(200).json(book);
    } catch (err) {
      console.error('Error fetching book by ID:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

export const addBook = async (req, res) => {
    try {
        const bookData = req.body;
        console.log("Received book data:", bookData);

        const newBook = await bookServices.addBook(bookData);
        res.status(200).json(newBook);
    } catch (err) {
        console.error('Error adding new book:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const bookData = req.body;

        const updatedBook = await bookServices.updateBook(bookData, bookId);
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(updatedBook);
    } catch (err) {
        console.error('Error updating book:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;

        const deletedBook = await bookServices.deleteBook(bookId);
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(deletedBook);
    } catch (err) {
        console.error('Error deleting book:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};