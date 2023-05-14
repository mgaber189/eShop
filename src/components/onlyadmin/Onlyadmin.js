import {useSelector } from 'react-redux';
const Onlyadmin=(props)=>{
    const Email = useSelector(state=>state.auth.email);
    if(Email==="admin@gmail.com"){
        return(
            props.children
        )
    }
    return null
}
export const Adminlink=(props)=>{
    const Email = useSelector(state=>state.auth.email);
    if(Email==="admin@gmail.com"){
        return(
            props.children
        )
    }
    return null
}
export default Onlyadmin