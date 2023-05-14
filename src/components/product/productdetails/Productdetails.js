import React from 'react'
import { Link, useParams } from "react-router-dom";
import styles from './Productdetails.module.css';
import { useSelector , useDispatch } from 'react-redux';
import { products } from '../../../redux/slice/productslice';
import {additem} from "../../../redux/slice/cartslice"
function Productdetails() {
  const {id}=useParams();
  const product=useSelector(products)
  const dispatch=useDispatch()
  const productdetails=product.filter((pro)=>pro.id===id);
  const addtocart=()=>{
    dispatch(additem(productdetails[0]))
  }
  return (
    <>
    <div className={styles.container}>
      <div className={styles.head}>
        <h2><b>Product Details</b></h2>
        <Link to="/#products">&larr; Back To Products</Link> 
      </div>
      <div className={styles.content}>
        <div className={styles.image}>
          <img src={productdetails[0].image} alt="detail"/>
        </div>
        <div className={styles.text}>
          <p className={styles.title}>{productdetails[0].title}</p>
          <h5 className={styles.price}>${productdetails[0].price}</h5>
          <p className={styles.description}>{productdetails[0].describe}</p>
          <p><b className={styles.title}>Brand: {productdetails[0].brand}</b></p>
          <button onClick={addtocart} className={styles.addingbtn}>Add to Cart</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Productdetails
