import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { reducer as formReducer } from 'redux-form'

import brand from '../reducers/brand'
import buttons from '../reducers/buttons'
import cards from '../reducers/cards'
import carts from '../reducers/carts'
import drawer from '../reducers/drawer'
import orders from '../reducers/orders'
import pages from '../reducers/pages'
import products from '../reducers/products'
import search from '../reducers/search'
import sections from '../reducers/sections'
import slides from '../reducers/slides'
import user from '../reducers/users'

const rootReducer = combineReducers({
  brand,
  buttons,
  cards,
  carts,
  drawer,
  form: formReducer,
  orders,
  pages,
  products,
  routing: routerReducer,
  search,
  sections,
  slides,
  user,
})

const middleware = routerMiddleware(browserHistory)

const configureStore = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk, middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
  return store
}

export default configureStore
