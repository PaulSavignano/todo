import express from 'express'
import { ObjectID } from 'mongodb'
import Cart from '../models/Cart'
import Product from '../models/Product'
import { authenticate } from '../../middleware/authenticate'

const carts = express.Router()

// Create
carts.post('/', (req, res) => {
  const { productId, productQty } = req.body.product
  Product.findOne({ _id: productId })
    .then(product => {
      const cart = new Cart({
        total: productQty * product.price,
        quantity: productQty,
        items: [{
          productId,
          productQty,
          name: product.name,
          price: product.price,
          total: productQty * product.price
        }]
      })
      cart.save()
        .then(doc => {
          res.header('cart', doc._id).send(doc)
        })
        .catch(err => {
          console.log(err)
          res.status(400).send(err)
        })
    })
})



// Read
carts.get('/:_id', (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send()
  }
  Cart.findById(_id)
    .then((cart) => {
      if (!cart) {
        return res.status(404).send()
      }
      res.send(cart)
    })
    .catch((err) => res.status(400).send(err))
})




// Update
carts.patch('/:_id', (req, res) => {
  const _id = req.params._id
  const { type, product } = req.body
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Cart.findOne({ _id })
    .then(cart => {
      const index = cart.items.map(i => i.productId.toHexString()).indexOf(product.productId)
      if (index !== -1) {
        switch (type) {
          case 'ADD_TO_CART':
            console.log('adding to existing')
            cart.total = cart.total + (cart.items[index].price * product.productQty)
            cart.quantity = cart.quantity + product.productQty
            cart.items[index] = {
              total: cart.items[index].price * (cart.items[index].productQty + product.productQty),
              price: cart.items[index].price,
              name: cart.items[index].name,
              productQty: cart.items[index].productQty + product.productQty,
              productId: cart.items[index].productId
            }
            cart.save()
              .then(cart => res.send(cart))
            break
          case 'REDUCE_FROM_CART':
            console.log('reducing')
            if (cart.items[index].productQty - product.productQty > 0) {
              cart.total = cart.total - (cart.items[index].price * product.productQty)
              cart.quantity = cart.quantity - product.productQty
              cart.items[index] = {
                total: cart.items[index].price * (cart.items[index].productQty - product.productQty),
                price: cart.items[index].price,
                name: cart.items[index].name,
                productQty: cart.items[index].productQty - product.productQty,
                productId: cart.items[index].productId
              }
              cart.save()
                .then(cart => res.send(cart))
            } else {
              cart.total = cart.total - (cart.items[index].price * product.productQty)
              cart.quantity = cart.quantity - product.productQty
              cart.items = cart.items.filter(item =>
                item.productId.toHexString() !== product.productId
              )
              cart.save()
                .then(cart => res.send(cart))
            }
            break
          case 'REMOVE_FROM_CART':
            console.log('removing')
            cart.total = cart.total - (cart.items[index].price * cart.items[index].productQty)
            cart.quantity = cart.quantity - cart.items[index].productQty
            cart.items = cart.items.filter(item =>
              item.productId.toHexString() !== product.productId
            )
            cart.save()
              .then(cart => res.send(cart))
            break
          default:
            return cart
        }
      } else {
        Product.findOne({ _id: product.productId })
          .then(pro => {
            cart.total = cart.total + (pro.price * product.productQty)
            cart.quantity = cart.quantity + product.productQty
            const item = {
              productId: product.productId,
              productQty: product.productQty,
              name: pro.name,
              price: pro.price,
              total: pro.price * product.productQty
            }
            cart.items.push(item)
            cart.save()
              .then(cart => res.send(cart))
          })
      }
  })
    .catch((err) => {
      console.log(err)
      res.status(400).send(err)
    })
})



// Delete
carts.delete('/:_id', (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) {
    return res.status(404).send()
  }
  Cart.findOneAndRemove({ _id,})
    .then((cart) => res.send(cart))
    .catch((err) => res.status(400).send(err))
})




export default carts