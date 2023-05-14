import React, { useEffect, useState } from "react";
import styles from "./Allproducts.module.css"
import {filterproduct,filterBySearch} from "../../../redux/slice/filterslice"
import {products , getProducts} from "../../../redux/slice/productslice";
import { useSelector,useDispatch } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Allproducts=()=>{
    const dispatch = useDispatch();
    const [searchValue,setSearchValue]=useState("");
    const selectproducts=useSelector(products);
    const filteredproduct = useSelector(filterproduct)
    const currentproduct = filteredproduct.length === 0?selectproducts:filteredproduct;
    useEffect(()=>{
        dispatch(filterBySearch({product:selectproducts,search:searchValue}))
    },[dispatch,searchValue,selectproducts])
    const deleteproduct=(id)=>{
        fetch(`https://e-commerce-f10ff-default-rtdb.firebaseio.com/products/${id}.json`,{
            method:"DELETE",
        }).then(
            toast.success( "Product Deleted successful", {
                position: "top-right",
            })
        )
    }
    return(
        <div className={styles.container}>
            <h2>All Products</h2>
            <p>{currentproduct.length} Products found</p>
            <div className={styles.search}>
                <input type="text" placeholder={`Search by name`} value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>s/n</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {currentproduct.map((pro,index)=>{
                    return(
                        <tr key={index}>
                            <td>{index}</td>
                                <td>
                                    <img src={pro.image}/>
                                </td>
                            <td>{pro.title}</td>
                            <td>{pro.category}</td>
                            <td>{pro.price}</td>
                            <td>
                                <Link to={`/admin/add-product/${pro.id}`}>
                                    <FaEdit size={25} color="green"/>
                                </Link>
                                <FaTrashAlt size={25} cursor="pointer" color="red" onClick={()=>deleteproduct(pro.id)}/>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}
export default Allproducts