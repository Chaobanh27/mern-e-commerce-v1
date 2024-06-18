/* eslint-disable no-console */
import { productModel } from '../models/productModel.js'
import { uploadProductPermission } from '../utils/permission.js'


export const getAllProducts = async(req, res ) => {
  try {
    const allProduct = await productModel.find().sort({ createdAt : -1 })

    res.json({
      message : 'All Product',
      success : true,
      error : false,
      data : allProduct
    })

  } catch (err) {
    res.status(400).json({
      message : err.message || err,
      error : true,
      success : false
    })
  }

}

export const uploadProduct = async (req, res) => {
  try {
    console.log(req)
    const userId = req.userId

    if (!uploadProductPermission(userId)) {
      throw new Error('Permission denied')
    }

    const uploadProduct = new productModel(req.body)
    const saveProduct = await uploadProduct.save()

    res.status(201).json({
      message : 'Product upload successfully',
      error : false,
      success : true,
      data : saveProduct
    })

  } catch (err) {
    res.staus(400).json({
      message: err.message || err,
      error: true,
      success : false
    })
  }
}


export const updateProduct = async (req, res) => {
  try {

    if (!uploadProductPermission(req.userId)) {
      throw new Error('Permission denied')
    }

    const { _id, ...resBody } = req.body

    const updateProduct = await productModel.findByIdAndUpdate(_id, resBody)

    res.json({
      message : 'Product update successfully',
      data : updateProduct,
      success : true,
      error : false
    })

  } catch (err) {
    res.status(400).json({
      message : err.message || err,
      error : true,
      success : false
    })
  }
}

export const getCategoryWiseProduct = async(req, res ) => {
  try {
    const { category } = req.body || req.query
    const product = await productModel.find({ category })

    res.json({
      data : product,
      message : 'Product',
      success : true,
      error : false
    })
  } catch (err) {
    res.status(400).json({
      message : err.message || err,
      error : true,
      success : false
    })
  }
}


export const searchProduct = async (req, res) => {
  try {
    const query = req.query.q
    /*
    RegExp(query, 'i', 'g') tạo một đối tượng RegExp mới. Đối số đầu tiên (query) là chuỗi ký tự được sử dụng để tạo biểu thức chính quy.
    Đối số thứ hai ('i') là một cờ (flag) để cho phép tìm kiếm không phân biệt chữ hoa chữ thường (case-insensitive).
    Đối số thứ ba ('g') là một cờ để cho phép tìm kiếm toàn bộ chuỗi (global search), không chỉ tìm kiếm lần đầu tiên gặp.
     */
    const regex = new RegExp(query, 'i', 'g')

    /*
    một mảng $or được sử dụng để tìm kiếm các sản phẩm có tên sản phẩm hoặc danh mục khớp với biểu thức chính quy đã tạo ra trước đó.
    */
    const product = await productModel.find({
      '$or' : [
        {
          productName: regex
        },
        {
          category : regex
        }
      ]
    })

    res.json({
      data  : product,
      message : 'Search Product list',
      error : false,
      success : true
    })
  } catch (err) {
    res.json({
      message : err.message || err,
      error : true,
      success : false
    })
  }
}

export const getProductDetails = async(req, res ) => {
  try {
    const { productId } = req.body

    const product = await productModel.findById(productId)

    res.json({
      data : product,
      message : 'Ok',
      success : true,
      error : false
    })

  } catch (err) {
    res.json({
      message : err?.message || err,
      error : true,
      success : false
    })
  }
}


export const getCategoryProduct = async (req, res) => {
  try {
    //dùng distinct để lấy 1 giá trị duy nhất từ 1 field cụ thể trong collection
    const productCategories = await productModel.distinct('category')

    const productByCategory = []

    for (const category of productCategories) {
      const product = await productModel.findOne({ category })
      productByCategory.push(product)
    }

    res.json({
      message : 'category product',
      data : productByCategory,
      success : true,
      error : false
    })
  } catch (err) {
    res.status(400).json({
      message : err.message || err,
      error : true,
      success : false
    })
  }
}

export const filterProduct = async (req, res ) => {
  try {
    const categoryList = req.body.category

    /*Toán tử $in trong truy vấn MongoDB cho phép tìm kiếm các giá trị của một trường trong một danh sách giá trị cụ thể. Trong trường hợp này,
    chúng ta muốn tìm các sản phẩm có trường category thuộc danh sách categoryList, do đó sử dụng { $in: categoryList } trong truy vấn. */
    const product = await productModel.find({
      category :  {
        '$in' : categoryList
      }
    })


    res.json({
      data : product,
      message : 'product',
      error : false,
      success : true
    })
  } catch (err) {
    res.json({
      message : err.message || err,
      error : true,
      success : false
    })
  }
}

