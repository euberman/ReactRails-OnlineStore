import { createStore, combineReducers } from 'redux'

import cartReducer from './cartReducer'
import checkoutReducer from './checkoutReducer'
import orderReducer from './orderReducer'
import productReducer from './productReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    products: productReducer,
    checkout: checkoutReducer,
    order: orderReducer,
});

const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store