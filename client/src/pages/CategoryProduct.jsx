/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import VerticalCard from '../components/VerticalCard'
import productCategory from '../utils/productCategory'
import { useLocation, useNavigate } from 'react-router-dom'
import SummaryApi from '../common'

const CategoryProduct = () => {

  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const urlSearch = new URLSearchParams(location.search)
  const urlCategoryListInArray = urlSearch.getAll('category')

  const urlCategoryListInObject = {}


  urlCategoryListInArray.forEach(value => {
    urlCategoryListInObject[value] = true
  })


  const [selectCategory, setSelectCategory] = useState(urlCategoryListInObject)
  const [filterCategoryList, setFilterCategoryList] = useState([])
  const [sortBy, setSortBy] = useState('')


  useEffect( () => {

    const fetchData = async () => {
      setLoading(true)
      const response = await fetch(SummaryApi.filterProduct.url, {
        method : SummaryApi.filterProduct.method,
        headers : {
          'content-type' : 'application/json'
        },
        body : JSON.stringify({
          category : filterCategoryList
        })
      })
      const dataResponse = await response.json()

      if (dataResponse?.data.length > 0) {
        setData(dataResponse?.data)
        setLoading(false)
      }

    }
    fetchData()
  }, [filterCategoryList])

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target

    setSelectCategory((prev) => {
      return {
        ...prev, [value] : checked
      }
    })
  }

  useEffect(() => {
    /*với object chứa các key là category thì chúng ta sẽ dùng Object.keys để trả về 1 mảng chứa các key
    và sau đó lặp qua từng phần tử trong mảng đó nếu như phần tử đó có tồn tại trong object selectCategory
    thì trả về phần tử đó còn không thì trả về null sau đó lọc mảng để chỉ trả về mảng chứa phần tử khác null
    */
    const arrayOfCategory = Object.keys(selectCategory).map(value => {
      if (selectCategory[value]) {
        return value
      }
      return null
    }).filter(el => el)

    setFilterCategoryList(arrayOfCategory)

    /*
    format lại url dùng điều kiện kiểm tra xem từng phần tử trong mảng có phải là phần tử cuối cùng không
    nếu như không phải là phần tử cuối cùng thì sẽ trả về url với && còn ngược llaji thì không trả về url với &&
    sau đó chúng ta dùng phép join('') để chuyển mảng thành chuỗi
    */
    const urlFormat = arrayOfCategory.map((value, index) => {
      if ((arrayOfCategory.length - 1) === index) {
        return `category=${value}`
      }
      return `category${value}&&`
    })


    navigate('/product-category?' + urlFormat.join(''))

  }, [selectCategory, navigate])


  const handleOnChangeSortBy = (e) => {
    const { value } = e.target

    setSortBy(value)

    if (value === 'asc') {
      setData(prev => prev.sort((a, b) => a.sellingPrice - b.sellingPrice))
    }
    else if (value === 'dsc') {
      setData(prev => prev.sort((a, b) => b.sellingPrice - a.sellingPrice))
    }
  }

  const renderData = () => {
    if ( data.length > 0) {
      return (
        <VerticalCard data={data} loading={loading}/>
      )
    }
  }


  return (

    <div className='container mx-auto p-4'>

      {/***desktop version */}
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>
        {/***left side */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
          {/**sort by */}
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>

            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' onChange={handleOnChangeSortBy} value={'asc'}/>
                <label>Price - Low to High</label>
              </div>

              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={'dsc'}/>
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>


          {/**filter by */}
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>

            <form className='text-sm flex flex-col gap-2 py-2'>
              {
                productCategory.map((categoryName, index) => {
                  return (
                    <div key={index} className='flex items-center gap-3'>
                      <input type='checkbox' name='category' checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                      <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                    </div>
                  )
                })
              }
            </form>
          </div>


        </div>


        {/***right side ( product ) */}
        <div className='px-4'>
          <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>

          <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
            {
              renderData()
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryProduct