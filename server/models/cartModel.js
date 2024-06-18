import mongoose from 'mongoose'

const cartSchema = mongoose.Schema({
  productId : {
    ref: 'product',
    type: String
  },
  quantity: Number,
  userId: String
}, {
  timestamps: true
})


export const cartModel = mongoose.model('cart', cartSchema)