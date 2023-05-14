import React from "react";
import Adminnav from "./adminnav/Adminnav";
import styles from "./Admin.module.css"
import { Route, Routes } from "react-router-dom";
import Allproducts from "./allproducts/Allproducts";
import Addproduct from "./addproduct/Addproduct";
import Home from "./adminhome/Home";
const Admin=()=>{
    return(
        <div className={styles.admin}>
            <div className={styles.navbar}>
                <Adminnav/>
            </div>
            <div className={styles.content}>
                <Routes>
                <Route path="all-products" element={<Allproducts />} />
                <Route path="add-product/:id" element={<Addproduct />} />
                <Route path="home" element={<Home />} />
                </Routes>
            </div>
        </div>
    )
}
export default Admin