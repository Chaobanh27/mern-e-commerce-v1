import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import AdminDashboard from '../pages/AdminDashboard'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import ProductDetails from '../pages/ProductDetails'
import CategoryProduct from '../pages/CategoryProduct'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '',
        element: <Home/>
      },
      {
        path: 'login',
        element: <Login/>
      },
      {
        path: 'sign-up',
        element: <SignUp/>
      },
      {
        path : 'cart',
        element : <Cart/>
      },
      {
        path : 'product/:id',
        element : <ProductDetails/>
      },
      {
        path : 'search',
        element : <SearchProduct/>
      },
      {
        path : 'product-category',
        element : <CategoryProduct/>
      },
      {
        path: 'admin-panel',
        element: <AdminPanel/>,
        children: [
          {
            path : 'admin-dashboard',
            element : <AdminDashboard/>
          },
          {
            path : 'all-users',
            element : <AllUsers/>
          },
          {
            path : 'all-products',
            element : <AllProducts/>
          }
        ]
      }
    ]
  }
])

export default router


