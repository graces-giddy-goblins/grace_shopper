import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_CART = 'UPDATE_CART'
const DELETE_ITEM = 'DELETE_ITEM'
const REMOVE_CART = 'REMOVE_CART'
const COMPLETE_ORDER = 'COMPLETE_ORDER'

/**
 * INITIAL STATE
 */
const initalState = {
  cart: []
}

/**
 * ACTION CREATORS
 */
const getCart = cart => ({
  type: GET_CART,
  cart
})
const addToCart = item => ({
  type: ADD_TO_CART,
  item
})
const updateCart = item => ({
  type: UPDATE_CART,
  item
})
const deleteItem = itemId => ({
  type: DELETE_ITEM,
  itemId
})
//check if we need cart action
const removeCart = cart => ({
  type: REMOVE_CART,
  cart
})
const completeOrder = order => ({
  type: COMPLETE_ORDER,
  order
})

/**
 * THUNK CREATORS
 */
export const getCartThunk = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/cart')
      dispatch(getCart(res.data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const addToCartThunk = item => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/cart', item)
      dispatch(addToCart(res.data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const completeOrderThunk = orderId => {
  return async dispatch => {
    try {
      const res = await axios.put(`api/cart/${orderId}`)
      dispatch(completeOrder(res.data))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initalState, action) {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: action.cart
      }
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.item]
      }
    case REMOVE_CART:
      return initalState
    case COMPLETE_ORDER:
      return {
        order: !state.order.complete
      }
    default:
      return state
  }
}
