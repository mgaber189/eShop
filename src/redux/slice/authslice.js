import {createSlice} from '@reduxjs/toolkit';
const initialState={
    isLoggedin:true,
    email:null,
    userName:null,
    userId:null,
}
const authslice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setActiveUserHandler:(state,action)=>{
            state.isLoggedin=true;
            state.email=action.payload.email;
            state.userName=action.payload.userName;
            state.userId=action.payload.userId
        },
        removeActiveUserHandler:(state)=>{
            state.isLoggedin=false;
            state.email=null;
            state.userName=null;
            state.userId=null;
        }
    }
})
export default authslice;
export const {setActiveUserHandler,removeActiveUserHandler}= authslice.actions
export const email = (state)=> state.auth.email;
export const isLoggedin = (state)=> state.auth.isLoggedin;
export const userId = (state)=> state.auth.userId;
export const userName = (state)=> state.auth.userName;