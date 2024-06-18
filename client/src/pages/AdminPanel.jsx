import { useSelector } from 'react-redux'
import { FaRegCircleUser } from 'react-icons/fa6'
import { Link, Outlet } from 'react-router-dom'
import { selectCurrentUserDetails } from '../redux/userSlice'

const AdminPanel = () => {
  const user = useSelector(selectCurrentUserDetails)

  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>

      <aside className='bg-white min-h-full  w-full  max-w-60 customShadow'>
        <div className='h-32  flex justify-center items-center flex-col'>
          <div className='text-5xl cursor-pointer relative flex justify-center'>
            {
              user?.data?.profilePic ? (
                <img src={user?.data?.profilePic} className='w-20 h-20 rounded-full' alt={user?.data?.name} />
              ) : (
                <FaRegCircleUser/>
              )
            }
          </div>
          <p className='capitalize text-lg font-semibold'>{user?.data?.name}</p>
          <p className='text-sm'>{user?.data?.role}</p>
        </div>

        {/***navigation */}
        <div>
          <nav className='grid p-4'>
            <Link to={'admin-dashboard'} className='px-2 py-1 hover:bg-slate-100'>Dashboard</Link>
            <Link to={'all-users'} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
            <Link to={'all-products'} className='px-2 py-1 hover:bg-slate-100'>All product</Link>
          </nav>
        </div>
      </aside>

      <main className='w-full h-full p-10'>
        <Outlet/>
      </main>
    </div>
  )
}

export default AdminPanel