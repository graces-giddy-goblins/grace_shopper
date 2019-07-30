import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_ITEMS = 'GET_ALL_ITEMS'
const GET_ITEM = 'GET_ITEM'

/**
 * INITIAL STATE
 */
const initialState = {
  items: [],
  singleItem: {}
}

/**
 * ACTION CREATORS
 */
const getAllItems = itemsList => ({
  type: GET_ALL_ITEMS,
  itemsList
})
const getItem = singleItem => ({
  type: GET_ITEM,
  singleItem
})

/**
 * THUNK CREATORS
 */
export const fetchItems = () => async dispatch => {
  try {
    const res = await axios.get('/api/items')
    console.log('AM I FETCHING ANYTHING', res)
    dispatch(getAllItems(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchSingleItem = id => async dispatch => {
  try {
    const res = await axios.get('/api/items/' + id)
    dispatch(getItem(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ITEMS:
      return {...state, items: action.itemsList}
    case GET_ITEM:
      return {...state, singleItem: action.singleItem}
    default:
      return state
  }
}
