/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {getCartThunk, addToCartThunk} from './cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {cart: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getCartThunk', () => {
    it('eventually dispatches the GET CART action', async () => {
      const fakeCart = {itemId: 1, orderId: 1, quantity: 1}
      mockAxios.onGet('/api/cart').replyOnce(200, fakeCart)
      await store.dispatch(getCartThunk())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_CART')
      expect(actions[0].cart).to.be.deep.equal(fakeCart)
    })
  })

  describe('addToCartThunk', () => {
    it('addToCartThunk: eventually dispatches the ADD_TO_CART action', async () => {
      const fakeCart = {itemId: 1, orderId: 1, quantity: 1}
      mockAxios.onPost('/api/cart').replyOnce(200, fakeCart)
      await store.dispatch(addToCartThunk())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('ADD_TO_CART')
      expect(actions[0].cart).to.be.deep.equal(fakeCart)
    })
  })
})
