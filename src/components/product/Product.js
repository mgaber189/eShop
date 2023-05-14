import React from "react";
import Filterproduct from "./filterproduct/Filterproduct";
import styles from './Product.module.css'
import Productlist from "./productlist/Productlist";
const Product=()=>{
    return (
        <div className={styles.container} id="product">
            <div className={styles.filter}>
                <Filterproduct/>
            </div>
            <div className={styles.content}>
                <Productlist/>
            </div>
        </div>
    )
}
export default Product;