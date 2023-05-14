import React from "react";
import styles from "./Adminnav.module.css"
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import {email} from "../../../redux/slice/authslice";
import { NavLink } from "react-router-dom";
const Adminnav=()=>{
    const userName = useSelector(email);
    const activelink=({isActive})=>(isActive ? `${styles.active}`:`${styles.navlinks}`)
    return(
        <div className={styles.nav}>
            <div className={styles.user}>
                <FaUserCircle className={styles.icon} size={60} color="#fff"/>
                <h4>{userName}</h4>
            </div>
            <div className={styles.listcontainer}>
                <ul className={styles.list}>
                    <li>
                        <NavLink to="/admin/home" className={activelink}>
                        Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/all-products" className={activelink}>
                        All Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/add-product/Add" className={activelink}>
                        Add Product
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Adminnav;