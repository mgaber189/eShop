import React,{useState,useEffect} from 'react'
import styles from './Productlist.module.css'
import { BsFillGrid3X3GapFill,BsListStars } from "react-icons/bs";
import Productitem from '../productitem/Productitem'
import { useSelector,useDispatch } from 'react-redux';
import {products} from "../../../redux/slice/productslice";
import { filterproduct,filterBySearch } from '../../../redux/slice/filterslice';
function Productlist() {
    const [grid,setGrid]=useState(true)
    const selectproducts=useSelector(products);
    const filterproducts=useSelector(filterproduct);
    const [searchValue,setSearchValue]=useState("");
    const dispatch=useDispatch();
    const currentproduct = filterproducts.length === 0 ?selectproducts:filterproducts;
    useEffect(()=>{
        dispatch(filterBySearch({product:selectproducts,search:searchValue}))
    },[dispatch,searchValue,selectproducts])
    // console.log(currentproduct)
  return (
    <div className={styles.container}>
        <div className={styles.producttop}>
            <div className={styles.lefticon}>
                <BsFillGrid3X3GapFill onClick={()=>setGrid(true)} color='orangered' size={30}/>
                <BsListStars className={styles.listicon} onClick={()=>setGrid(false)}  size={30}/>
                <p><b>{currentproduct.length}</b> products found</p>
            </div>
            <div className={styles.search}>
                <input type="text" placeholder={`Search by name`} value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>
            </div>
        </div>
        <div className={grid? styles.productsgrid :styles.productslist}>
            {currentproduct.map((product)=>{
                return(
                    <Productitem key={product.id} grid={grid} pro={product}/>
                )
            })}
        </div>
    </div>
  )
}

export default Productlist
