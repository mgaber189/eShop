import React, { useState } from "react";
import styles from "./Addproduct.module.css"
import Card from "../../ui/Card"
import { useParams } from "react-router-dom";
import {products} from "../../../redux/slice/productslice"
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const Addproduct =()=>{
    const {id}=useParams();
    const product = useSelector(products);
    const productEdite = product.find((pro)=>pro.id===id);
    const formkind=(id,f1,f2)=>{
        if(id==="Add"){
            return f1; 
        }
        return f2;
    } 
    const initialproduct={
        title:"",
        quantity:0,
        price:0,
        image:"",
        description:"",
        category:"",
        brand:"",
    }
    const [curentproduct,setcurentproduct]=useState(()=>{
        const newstate=formkind(id,{...initialproduct},productEdite)
        return newstate
    })
      const category = [
        "All",
        ...new Set(product.map((products) => products.category)),
      ];
      const inputChange=(e)=>{
        const { name, value } = e.target;
        setcurentproduct({...curentproduct,[name]:value});
      }
      const addproduct=(e)=>{
        e.preventDefault();
        fetch("https://e-commerce-f10ff-default-rtdb.firebaseio.com/products.json",{
            method:"POST",
            body:JSON.stringify({
                title:curentproduct.title,
                image:curentproduct.image,
                price:  curentproduct.price,
                description:curentproduct.description,
                quantity:  curentproduct.quantity,
                category:curentproduct.category,
                brand: curentproduct.brand,
                review:""
            })
        })
      };
      const editeproduct=(e)=>{
        e.preventDefault();
        fetch(`https://e-commerce-f10ff-default-rtdb.firebaseio.com/products/${id}.json`,{
            method:"PUT",
            body:JSON.stringify({
                title:curentproduct.title,
                image:curentproduct.image,
                price:  curentproduct.price,
                description:curentproduct.description,
                quantity:  curentproduct.quantity,
                category:curentproduct.category,
                brand: curentproduct.brand,
                review:""
            })
        }).then(
            toast.success( "Product Added successful", {
                position: "top-right",
            })
        )
      }

    return(
        <div className={styles.container}>
            <h2>{formkind(id,"Add Product","Edite Product")}</h2>
            <Card style={styles.formcard}>
                <form onSubmit={formkind(id,addproduct,editeproduct)}>
                    <label>Product Name:</label>
                    <input name="title" placeholder="Product name"   type="text" value={curentproduct.title} onChange={(e)=>inputChange(e)}/>
                    <label>Image Link:</label>
                    <input name="image" placeholder="Image link" type="text" value={curentproduct.image} onChange={(e)=>inputChange(e)}/>
                    <label>Product Price</label>
                    <input name="price" placeholder="Product price" type="number" value={curentproduct.price} onChange={(e)=>inputChange(e)}/>
                    <label>Product quantity</label>
                    <input name="quantity" placeholder="Product quantity" type="number" value={curentproduct.quantity} onChange={(e)=>inputChange(e)}/>
                    <label>Product Category:</label>
                    <select name="category" value={curentproduct.category} onChange={(e)=>inputChange(e)}>
                        {category.map((cat,index)=>{
                            return(
                                <option key={index} value={cat}>{cat}</option>
                            )
                        })}
                    </select>
                    <label>Product Brand:</label>
                    <input name="brand" placeholder="Product brand" type="text" value={curentproduct.brand} onChange={(e)=>inputChange(e)}/>
                    <label>Product Description:</label>
                    <textarea name="description" placeholder="Description" cols="30" rows="10" value={curentproduct.describe} onChange={(e)=>inputChange(e)}></textarea>
                    <button type="submit">{formkind(id,"Add Product","Edite Product")}</button>
                </form>
            </Card>
            
        </div>
    )
}
export default Addproduct