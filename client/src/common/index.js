const backendDomin = 'http://localhost:3000'


const SummaryApi = {
  signUP : {
    url : `${backendDomin}/api/signup`,
    method : 'post'
  },
  login : {
    url : `${backendDomin}/api/login`,
    method : 'post'
  },
  current_user : {
    url : `${backendDomin}/api/user-details`,
    method : 'get'
  },
  logout_user : {
    url : `${backendDomin}/api/logout`,
    method : 'post'
  },
  allUser : {
    url : `${backendDomin}/api/all-user`,
    method : 'get'
  },
  updateUser : {
    url : `${backendDomin}/api/update-user`,
    method : 'post'
  },
  uploadProduct : {
    url : `${backendDomin}/api/upload-product`,
    method : 'post'
  },
  allProduct : {
    url : `${backendDomin}/api/get-all-product`,
    method : 'get'
  },
  updateProduct : {
    url : `${backendDomin}/api/update-product`,
    method  : 'post'
  },
  categoryProduct : {
    url : `${backendDomin}/api/get-category-product`,
    method : 'get'
  },
  categoryWiseProduct : {
    url : `${backendDomin}/api/category-product`,
    method : 'post'
  },
  productDetails : {
    url : `${backendDomin}/api/product-details`,
    method : 'post'
  },
  addToCartProduct : {
    url : `${backendDomin}/api/add-to-cart`,
    method : 'post'
  },
  addToCartProductCount : {
    url : `${backendDomin}/api/count-add-to-cart-Product`,
    method : 'get'
  },
  addToCartProductView : {
    url : `${backendDomin}/api/view-card-product`,
    method : 'get'
  },
  updateCartProduct : {
    url : `${backendDomin}/api/update-cart-product`,
    method : 'post'
  },
  deleteCartProduct : {
    url : `${backendDomin}/api/delete-cart-product`,
    method : 'post'
  },
  searchProduct : {
    url : `${backendDomin}/api/search`,
    method : 'get'
  },
  filterProduct : {
    url : `${backendDomin}/api/filter-product`,
    method : 'post'
  }
}

export default SummaryApi