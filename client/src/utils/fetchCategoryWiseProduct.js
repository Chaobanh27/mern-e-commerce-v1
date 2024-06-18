import SummaryApi from '../common'

const fetchCategoryWiseProduct = async(category) => {
  const response = await fetch(SummaryApi.categoryWiseProduct.url, {
    method : SummaryApi.categoryWiseProduct.method,
    headers : {
      'content-type' : 'application/json'
    },
    body : JSON.stringify({
      category : category
    })
  })

  const data = await response.json()

  return data
}

export default fetchCategoryWiseProduct