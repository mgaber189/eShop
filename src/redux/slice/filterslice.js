import { createSlice } from "@reduxjs/toolkit";
const initialState={
    filteredproduct:[],
}
const filterslice=createSlice({
    name:"filter",
    initialState,
    reducers:{
        filterByCategory(state,action){
            const {product,category}=action.payload;
            let temp=[];
            if(category==="All"){
                temp=product;
            }else{
                temp=product.filter((pro)=>pro.category===category)
            }
            state.filteredproduct=temp
        },
        filerByPrice(state,action){
            const {product,pricerange}=action.payload;
            let temp =product.filter((pro)=>pro.price<=pricerange);
            state.filteredproduct=temp;
        },
        filterBySearch(state,action){
            const {product , search}=action.payload;
            let temp=product.filter(
                (product) =>
                    product.title.toLowerCase().includes(search.toLowerCase()) ||
                    product.category.toLowerCase().includes(search.toLowerCase())
            )
            state.filteredproduct=temp;
        }
    }

});
export const {filterByCategory,filerByPrice,filterBySearch} = filterslice.actions;
export const filterproduct=(state)=>state.filter.filteredproduct;
export default filterslice;