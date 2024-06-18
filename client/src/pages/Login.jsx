import { Link, useNavigate } from 'react-router-dom'
import loginIcons from '../assets/signin.gif'
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { useState } from 'react'
import SummaryApi from '../common/index'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { fetchUserDetailsAPI } from '../redux/userSlice'
import { fetchAddToCardproductCountAPI } from '../redux/cartSlice'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [data, setData] = useState({
    email : '',
    password : ''
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData(prev => { return { ...prev, [name]: value } } )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch(SummaryApi.login.url, {
      method: SummaryApi.login.method,
      credentials: 'include',
      headers : {
        'content-type' : 'application/json'
      },
      body : JSON.stringify(data)
    })
    const dataApi = await res.json()

    if (dataApi.success) {
      toast.success(dataApi.message)
      navigate('/')
      dispatch(fetchUserDetailsAPI())
      dispatch(fetchAddToCardproductCountAPI())
    }

    if (dataApi.error) {
      toast.error(dataApi.message)
    }
  }

  return (
    <>
      <section id="login">
        <div className=" mx-auto container p-4">
          <div className="bg-white p-5 w-full max-w-sm mx-auto">

            <div className="w-20 h-20 mx-auto">
              <img src={loginIcons} alt="login icon" />
            </div>

            <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit} >

              <div>
                <label htmlFor="email">Email:</label>
                <div className=' bg-slate-100 p-2'>
                  <input
                    type="email"
                    placeholder='enter email'
                    name='email'
                    autoComplete='email'
                    value={data.email}
                    onChange={handleOnChange}
                    className=' w-full h-full outline-none bg-transparent'
                  />
                </div>
              </div>

              <div>
                <label>Password : </label>
                <div className='bg-slate-100 p-2 flex'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='enter password'
                    value={data.password}
                    name='password'
                    autoComplete='current-password'
                    onChange={handleOnChange}
                    className='w-full h-full outline-none bg-transparent'/>
                  <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
                    <span>
                      {
                        showPassword ? (
                          <FaEyeSlash/>
                        )
                          :
                          (
                            <FaEye/>
                          )
                      }
                    </span>
                  </div>
                </div>
                <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                    Forgot password ?
                </Link>
              </div>

              <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>

              <p className='my-5'>Do not have account ? <Link to='/sign-up' className=' text-red-600 hover:text-red-700 hover:underline'>Sign up</Link></p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login