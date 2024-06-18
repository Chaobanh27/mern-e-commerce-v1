import { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from 'react-icons/md'
import ChangeUserRole from '../components/ChangeUserRole'
// import ChangeUserRole from '../components/ChangeUserRole'

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([])
  const [openUpdateRole, setOpenUpdateRole] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email : '',
    name : '',
    role : '',
    _id  : ''
  })

  const fetchAllUsers = async() => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method : SummaryApi.allUser.method,
      credentials : 'include'
    })

    const dataResponse = await fetchData.json()

    if (dataResponse.success) {
      setAllUsers(dataResponse.data)
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message)
    }

  }

  useEffect(() => {
    fetchAllUsers()
  }, [])

  return (
    <div className='bg-white pb-4'>
      <table className='w-full userTable'>
        <thead>
          <tr className='bg-black text-white'>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className=''>
          {
            allUser.map((value, index) => {
              return (
                <tr key={value._id}>
                  <td>{index+1}</td>
                  <td>{value?.name}</td>
                  <td>{value?.email}</td>
                  <td>{value?.role}</td>
                  <td>{moment(value?.createdAt).format('LL')}</td>
                  <td>
                    <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                      onClick={() => {
                        setUpdateUserDetails(value)
                        setOpenUpdateRole(true)

                      }}
                    >
                      <MdModeEdit/>
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      {
        openUpdateRole && (
          <ChangeUserRole
            onClose={() => setOpenUpdateRole(false)}
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id}
            callFunc={fetchAllUsers}
          />
        )
      }
    </div>
  )
}

export default AllUsers