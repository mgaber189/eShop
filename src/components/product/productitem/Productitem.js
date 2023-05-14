import React from 'react'
import styles from './Productitem.module.css'
import { Link} from "react-router-dom";
import {useDispatch } from 'react-redux';
import {additem}from '../../../redux/slice/cartslice'
function Productitem(props) {
    const {image,title,price,id,describe}=props.pro
    const dispatch=useDispatch();
    const addtocart=()=>{
      dispatch(additem(props.pro))
    }
  return (
    <div className={props.grid? styles.card :styles.productslist}>
      <Link to={`/productdetails/${id}`} className={styles.imagecontainer}>
        <img src={image} alt="Product"/>
      </Link>  
      <div className={styles.info}>
          <div>
              <p><b>${price}</b></p>
              <p>{title.substring(0,15)}....</p>
              {!props.grid && <p>{describe}</p>}
          </div>
      {!props.grid && <button onClick={addtocart} className={ props.grid?styles.addbtn:styles.listbtn} type="button">Add to Cart</button>}
      </div>
      {props.grid && <button onClick={addtocart} className={ props.grid?styles.addbtn:styles.listbtn} type="button">Add to Cart</button>}
    </div>
  )
}

export default Productitem
