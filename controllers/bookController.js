const { readJSON, writeJSON } = require("../utils/fileService")
const path = require('path')
const booksPath = path.join(__dirname,'../models/books.json')
const { v4:uuidv4 }= require('uuid')

const createBook=async(req,res)=>{
    const { title, author, genre, publishedYear } = req.body
    const userId=req.user.userId
    if(!title || !author || !genre || !publishedYear){
        return res.status(400).json({ message: 'All fields are required' })
    }
    try {
        const books=await readJSON(booksPath)
        const newBook={
            id:uuidv4(),
            title,
            author,
            genre,
            publishedYear,
            userId
        }
        books.push(newBook)
        await writeJSON(booksPath, books)
        res.status(201).json({ message: 'Book created successfully', book: newBook })
    } catch (error) {
        console.error('Create book error:', error)
        res.status(500).json({ message: 'Server error' })
    }
}

const updateBook=async(req,res)=>{
    const { id }=req.params
    const userId=req.user.userId
    try {
        const books=await readJSON(booksPath)
        const index=books.findIndex(b=>b.id===id)
        if(index===-1){
            res.status(404).json({ message: 'Book not found' })
        }
        if(books[index].userId!==userId){
            return res.status(403).json({ message: 'Unauthorized' })
        }
        books[index] = { ...books[index], ...req.body }
        await writeJSON(booksPath, books)
        res.json(books[index])
    } catch (error) {
        console.error('Update book error:', error)
        res.status(500).json({ message: 'Server error' })
    }
}

const deleteBook=async(req,res)=>{
    const {id}=req.params
    const userId=req.user.id
    try {
        let books = await readJSON(booksPath)
        const book=books.findIndex(b=>b.id===id)
        if (!book){
            return res.status(404).json({ message: 'Book not found' })
        }
        if (book.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized' })
        }
        books = books.filter(b => b.id !== id)
        await writeJSON(booksPath, books)
        res.json({ message: 'Book deleted successfully' })
    } catch (error) {
        console.error('Delete book error:', error)
        res.status(500).json({ message: 'Server error' })
    }
}

const getBookById=async(req,res)=>{
  try {
    const books = await readJSON(booksPath)
    const book = books.find(b => b.id === req.params.id)
    if (!book) return res.status(404).json({ message: 'Book not found' })
    res.json(book);
  } catch (error) {
    console.error('Get book by ID error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

const getAllBooks=async(req,res)=>{
  try {
    const books = await readJSON(booksPath)
    res.status(200).json(books)
  } catch (error) {
    console.error('Error fetching books:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

const getBooksPaginated=async(req,res)=>{
    try {
        let books=await readJSON(booksPath)
        const page=parseInt(req.query.page || 1)
        const limit = parseInt(req.query.limit) || books.length
        const start = (page - 1) * limit
        const paginatedBooks = books.slice(start, start + limit)
        res.json({
            results: paginatedBooks,
            totalBooks: books.length,
            currentPage: page,
            totalPages: Math.ceil(books.length / limit),
        })
    } catch (error) {
        console.error('Get books error:', error)
        res.status(500).json({ message: 'Server error' })
    }
}

const searchBooksByGenre=async(req,res)=>{
    try {
        const { genre } = req.query
        if (!genre) {
        return res.status(400).json({ message: 'Genre query is required' })
        }

        const books = await readJSON(booksPath)
        const filtered = books.filter(
        book => book.genre.toLowerCase() === genre.toLowerCase()
        )
        res.status(200).json(filtered)
    } catch (error) {
        console.error('Error searching books:', error)
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports={createBook,updateBook,deleteBook,getBookById,getAllBooks,getBooksPaginated,searchBooksByGenre}