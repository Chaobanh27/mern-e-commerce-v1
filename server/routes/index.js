import express from 'express'
import { Login, SignUp, Logout } from '../controller/authController.js'
import { getAllUsers, updateUser, userDetails } from '../controller/userController.js'
import { authToken } from '../middleware/authToken.js'
import { filterProduct, getAllProducts, getCategoryProduct, getCategoryWiseProduct, getProductDetails, searchProduct, updateProduct, uploadProduct } from '../controller/productController.js'
import { addToCart, addToCartViewProduct, countAddToCartProduct, deleteAddToCartProduct, updateCart } from '../controller/cartController.js'

const router = express.Router()

//test
router.get('/', (red, res) => {
  res.json({ message: 'API is working' })
})

// auth
router.post('/signup', SignUp)
router.post('/login', Login)
router.get('/user-details', authToken, userDetails)
router.post('/logout', Logout)

// user
router.get('/all-user', authToken, getAllUsers)
router.post('/update-user', authToken, updateUser)

//product
router.post('/upload-product', authToken, uploadProduct)
router.get('/get-all-product', getAllProducts)
router.post('/update-product', authToken, updateProduct)
router.post('/category-product', getCategoryWiseProduct)
router.get('/search', searchProduct)
router.post('/filter-product', filterProduct)
router.post('/product-details', getProductDetails)
router.get('/get-category-product', getCategoryProduct)


//cart
router.post('/add-to-cart', authToken, addToCart)
router.get('/count-add-to-cart-Product', authToken, countAddToCartProduct)
router.post('/update-cart-product', authToken, updateCart)
router.get('/view-card-product', authToken, addToCartViewProduct)
router.post('/delete-cart-product', authToken, deleteAddToCartProduct)


export const route = router