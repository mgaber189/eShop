import React, { useState,useEffect } from 'react'
import Loader from '../../loader/Loader'
import styles from './Filterproduct.module.css'
import { useSelector,useDispatch } from 'react-redux'
import { products ,minrange,maxringe , pricerange } from '../../../redux/slice/productslice'
import { filterByCategory ,filerByPrice } from '../../../redux/slice/filterslice'
function Filterproduct() {
  const [isLoading,setIsLoading]=useState(false);
  const [price , setPrice]=useState(0)
  const minRange=useSelector(minrange);
  const maxRange=useSelector(maxringe);
  const product =useSelector(products);
  const dispatch = useDispatch(); 
  const category = [
    "All",
    ...new Set(product.map((products) => products.category)),
  ];
  const filterbycategory=(cat)=>{
    dispatch(filterByCategory({product,category:cat}));
  }
  useEffect(()=>{
    dispatch(pricerange());
  })
  useEffect(()=>{
    dispatch(filerByPrice({product,pricerange:price}));
  })
  const resetFilter=()=>{
    setPrice(maxRange)
  }

  return (
    <>
        {isLoading && <Loader/>}
        <div className={styles.container}>
            <h2>Categories</h2>
            <div className={styles.category}>
              {category.map((cat,index)=>{
                return (
                  <button key={index} type='button' className={`${styles.catbtn}`} onClick={()=>filterbycategory(cat)} >
                    &#8250; {cat}
                  </button>
                )
              })}
            </div>
            <div className={styles.brand}>
              <h2>Price</h2>
              <h3>{price}</h3>
              <div className={styles.price}>
                <input type="range" min={minRange} max={maxRange} value={price} onChange={(e)=>setPrice(e.target.value)}/>
              </div>
              <br/>
            </div>
              <button className={styles.clearbtn} onClick={resetFilter}>
                Clear filter
              </button>
        </div>
    </>
  )
}

export default Filterproduct
