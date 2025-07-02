const express=require('express')
const router=express.Router()
const auth=require('../middleware/authMiddleware')
const {createBook,updateBook,deleteBook,getBookById,getAllBooks,getBooksPaginated,searchBooksByGenre}=require('../controllers/bookController')

router.post('/', auth, createBook)
router.get('/', auth, getAllBooks)
router.get('/:id', auth, getBookById)
router.put('/:id', auth, updateBook)
router.delete('/:id', auth, deleteBook)
router.get('/search/genre', auth, searchBooksByGenre)
router.get('/paginated/books', auth, getBooksPaginated)

module.exports = router