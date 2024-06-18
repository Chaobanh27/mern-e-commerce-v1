import { cartModel } from '../models/cartModel.js'

export const addToCart = async (req, res) => {
  try {
    const currentUserId = req.userId
    const { productId } = req.body

    const isProductAvailable = await cartModel.findOne({ productId })

    if (isProductAvailable) {
      return res.json({
        message : 'Already exits in Add to cart',
        success : false,
        error : true
      })
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUserId
    }

    const cart = new cartModel(payload)
    const saveProduct = await cart.save()

    return res.json({
      data: saveProduct,
      message: 'Product Added to Cart',
      success: true,
      error: false
    })
  } catch (error) {
    res.json({
      message : error?.message || error,
      error : true,
      success : false
    })
  }
}

export const updateCart = async (req, res) => {
  try {
    const cartProductId = req?.body?._id

    const qty = req?.body?.quantity

    const updateProduct = await cartModel.findOneAndUpdate({
      _id: cartProductId
    },
    {
      ...(qty && { quantity : qty })
    },
    {
      returnDocument: 'after'
    })

    res.json({
      message : 'Product Updated',
      data : updateProduct,
      error : false,
      success : true
    })
  } catch (error) {
    res.json({
      message : error?.message || error,
      error : true,
      success : false
    })
  }
}

export const deleteAddToCartProduct = async(req, res ) => {
  try {
    const addToCartProductId = req.body._id

    const deleteProduct = await cartModel.findOneAndDelete(
      { _id : addToCartProductId },
      { returnDocument: 'after' }
    )

    res.json({
      message : 'Product Deleted From Cart',
      error : false,
      success : true,
      data : deleteProduct
    })

  } catch (err) {
    res.json({
      message : err?.message || err,
      error : true,
      success : false
    })
  }
}

export const countAddToCartProduct = async(req, res) => {
  try {
    const currentUserId = req.userId

    const count = await cartModel.countDocuments({
      userId : currentUserId
    })

    res.json({
      data : {
        count : count
      },
      message : 'ok',
      error : false,
      success : true
    })
  } catch (error) {
    res.json({
      message : error.message || error,
      error : true,
      success : false
    })
  }
}


export const addToCartViewProduct = async(req, res ) => {
  try {
    const currentUserId = req.userId

    const allProduct = await cartModel.find({
      userId : currentUserId
    }).populate('productId')

    res.json({
      data : allProduct,
      success : true,
      error : false
    })

  } catch (err) {
    res.json({
      message : err.message || err,
      error : true,
      success : false
    })
  }
}
