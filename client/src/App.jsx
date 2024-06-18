import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUserDetailsAPI } from './redux/userSlice'
import { fetchAddToCardproductCountAPI } from './redux/cartSlice'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserDetailsAPI())
    dispatch(fetchAddToCardproductCountAPI())
  }, [dispatch])

  return (
    <>
      <ToastContainer position='bottom-center' autoClose={1000} />
      <Header/>
      <main className=" min-h-screen pt-16">
        <Outlet/>
      </main>
      <Footer/>
    </>
  )
}

export default App
