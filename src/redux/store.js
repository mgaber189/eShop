import {configureStore,combineReducers} from '@reduxjs/toolkit';
import authslice from './slice/authslice'
import productslice from './slice/productslice';
import filterslice from './slice/filterslice';
import cartslice from './slice/cartslice';
import orderslice from './slice/orderslice';
const rootreducer=combineReducers({
    auth:authslice.reducer,
    product : productslice.reducer,
    filter : filterslice.reducer,
    cart : cartslice.reducer,
    order:orderslice.reducer
});
const store=configureStore({
    reducer:rootreducer
})
export default store;