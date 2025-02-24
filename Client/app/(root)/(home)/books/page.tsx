"use client"

import type React from "react"
import { useEffect, useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search } from "lucide-react"

interface Book {
  book_id: number
  book_name: string
  book_cat_id: number
  book_collection_id: number
  book_launch_date: string
  book_publisher: string
}

export default function Books() {
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // 1. Updated fetchBooks to include Authorization header
  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true)

      // Get token from localStorage (if user is logged in)
      const token = localStorage.getItem("token")

      const res = await fetch("https://libread-server.vercel.app/books", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      })

      if (!res.ok) {
        // Handle 401/403 or other errors
        console.error("Failed to fetch books:", res.status)
        setBooks([])
        setFilteredBooks([])
        return
      }

      const data = await res.json()
      console.log(data)
      setBooks(data)
      setFilteredBooks(data)
    } catch (err) {
      console.error("Error fetching books:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBooks()
  }, [fetchBooks])

  useEffect(() => {
    const filtered = books.filter(
      (book) =>
        book.book_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.book_publisher.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredBooks(filtered)
  }, [searchTerm, books])

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Books List</h1>
        <div className="flex items-center justify-center w-full">
          <Search className="mr-2 h-5 w-5 text-gray-500" />
          <Input
            type="text"
            placeholder="Search by name or publisher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs border border-gray-300 bg-gray-100 rounded-xl placeholder:text-gray-500 text-sm"
          />
        </div>
      </header>

      {loading ? (
        <LoadingSkeleton />
      ) : filteredBooks.length ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-900 text-white hover:bg-gray-900">
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category ID</TableHead>
                <TableHead>Collection ID</TableHead>
                <TableHead>Launch Date</TableHead>
                <TableHead>Publisher</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.map((book) => (
                <TableRow key={book.book_id}>
                  <TableCell>{book.book_id}</TableCell>
                  <TableCell>{book.book_name}</TableCell>
                  <TableCell>{book.book_cat_id}</TableCell>
                  <TableCell>{book.book_collection_id}</TableCell>
                  <TableCell>{new Date(book.book_launch_date).toLocaleString() || "N/A"}</TableCell>
                  <TableCell>{book.book_publisher}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">No books found.</p>
      )}
    </div>
  )
}

const LoadingSkeleton = () => (
  <div className="space-y-4">
    {[...Array(8)].map((_, index) => (
      <div key={index} className="flex items-center space-x-4 animate-pulse">
        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="flex-1 h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="w-16 h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="w-16 h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="w-32 h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="w-24 h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="w-16 h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    ))}
  </div>
)
