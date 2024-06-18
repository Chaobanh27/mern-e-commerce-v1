/* eslint-disable no-console */
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { GrSearch } from 'react-icons/gr'
import { FaRegCircleUser } from 'react-icons/fa6'
import { FaShoppingCart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import ROLE from '../common/role'
import { fetchUserLogoutAPI, selectCurrentUserDetails } from '../redux/userSlice'
import { toast } from 'react-toastify'
import { selectCurrentCartProductCount } from '../redux/cartSlice'

const Header = () => {
  const [menuDisplay, setMenuDisplay] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUserDetails)
  const cartProductCount = useSelector(selectCurrentCartProductCount)
  const navigate = useNavigate()

  /*sử dụng hook useLocation để lấy thông tin về URL hiện tại. searchInput chứa đối tượng đại diện cho URL và các thông tin truy vấn liên quan đến nó */
  const searchInput = useLocation()
  /*tạo một đối tượng URLSearchParams và truyền chuỗi truy vấn từ searchInput.search vào đó. Đối tượng URLSearchParams sẽ giúp bạn thao tác với các thông tin truy vấn trong URL. */
  const URLSearch = new URLSearchParams(searchInput.search)
  /*sử dụng phương thức getAll của đối tượng URLSearchParams để lấy tất cả các giá trị của thông tin truy vấn có khóa là 'q'. Kết quả được lưu trong mảng searchQuery */
  const searchQuery = URLSearch.getAll('q')
  /*Tạo state với giá trị ban đầu là searchQuery */
  const [search, setSearch] = useState(searchQuery)

  const handleLogout = async () => {
    dispatch(fetchUserLogoutAPI())
      .then((data) => {
        if (data.payload.message) {
          toast.success(data.payload.message)
          navigate('/')
        }
        if (data.payload.error) {
          toast.error(data.message)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleSearch = (e) => {
    const { value } = e.target

    setSearch(value)

    if (value) {
      navigate(`/search?q=${value}`)
    } else {
      navigate('/search')
    }
  }

  return (
    <>
      <header className=" h-16 shadow-md bg-white fixed w-full z-40 ">
        <div className=" h-full container mx-auto flex items-center px-4 justify-between ">

          <div className=''>
            <Link to='/'>
              <Logo/>
            </Link>
          </div>

          <div className=' hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2 '>
            <input onChange={handleSearch} value={search} type="text" placeholder='search product...' className='w-full outline-none' />
            <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
              <GrSearch/>
            </div>
          </div>

          <div className='flex items-center gap-7'>

            <div className='relative flex justify-center'>

              {
                user?.data?._id && (
                  <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(preve => !preve)}>
                    {
                      user?.data?.profilePic ? (
                        <img src={user?.data?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                      ) : (
                        <FaRegCircleUser/>
                      )
                    }
                  </div>
                )
              }


              {
                menuDisplay && (
                  <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded' >
                    <nav>
                      {
                        user?.data?.role === ROLE.ADMIN && (
                          <Link to='/admin-panel/admin-dashboard' className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Admin Panel</Link>
                        )
                      }

                    </nav>
                  </div>
                )
              }

            </div>

            {
              user?.data?._id && (
                <Link to='/cart' className='text-2xl relative'>
                  <span><FaShoppingCart/></span>

                  <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                    <p className='text-sm'>{cartProductCount}</p>
                  </div>
                </Link>
              )
            }

            <div>
              {
                user?.data?._id ? (
                  <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
                )
                  : (
                    <Link to='/login' className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Login</Link>
                  )
              }

            </div>

          </div>

        </div>
      </header>
    </>
  )
}

export default Header