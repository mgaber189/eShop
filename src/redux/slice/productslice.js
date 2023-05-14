import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
const initialState={
    productdata:[],
    minPrice:5,
    maxPrice: 5,
}
export const  getProducts= createAsyncThunk('products/getProducts', ()=>{
    return fetch("https://e-commerce-f10ff-default-rtdb.firebaseio.com/products.json")
    .then((respons)=>{return respons.json()})
    .catch((error)=>console.log(error))
});
const productslice= createSlice({
    name:"products",
    initialState,
    reducers:{
        pricerange(state){
            const pricearray=[];
            state.productdata.map((pro)=>{
                const price=pro.price;
                return pricearray.push(price);
            })
            const max=Math.max(...pricearray);
            const min =Math.min(...pricearray);
            state.minPrice=min;
            state.maxPrice=max;
        }
    },
    extraReducers:{
        [getProducts.pending]:()=>{},
        [getProducts.fulfilled]:(state,action)=>{
            for(const key in action.payload){
                state.productdata.push({
                    id:key,
                    title:action.payload[key].title,
                    image:action.payload[key].image,
                    price:action.payload[key].price,
                    quantity:action.payload[key].quantity,
                    category:action.payload[key].category,
                    brand:action.payload[key].brand,
                    describe:action.payload[key].description,
                    review:action.payload[key].review
                })
            }
        },
        [getProducts.rejected]:()=>{}
    }
});
export  const products = (state)=>state.product.productdata; 
export  const minrange = (state)=>state.product.minPrice; 
export  const maxringe = (state)=>state.product.maxPrice; 
export const {addproducts , pricerange}=productslice.actions
export default productslice;