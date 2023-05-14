import React from "react";
import styles from "./Cart.module.css"
import { useSelector , useDispatch } from "react-redux";
import {cartitem,cartprice,cartquantity,additem,decrease,clearcart,removefromcart} from "../../redux/slice/cartslice"
import {MdDelete}from "react-icons/md"
import {Link , useNavigate} from "react-router-dom";
import Card from "../ui/Card"
const Cart=()=>{
    const dispatch=useDispatch();
    const items = useSelector(cartitem);
    const prices =useSelector(cartprice);
    const quantity = useSelector(cartquantity);
    const navigate = useNavigate();
    const postorder=()=>{
        navigate("/checkout")
    }
    return(
        <div className={styles.container}>
            <h2>Shopping Cart</h2>
            {items.length===0?(
                <>
                    <p>Your cart is currently empty.</p>
                    <br />
                    <div>
                    <Link to="/#products">&larr; Continue shopping</Link>
                    </div>
                </>
            ):(
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>s/n</th>
                                <th>Products</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items?.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>
                                            {item.title}
                                            <img src={item.image}/>
                                        </td>
                                        <td>{item.price}</td>
                                        <td><span onClick={()=>dispatch(decrease(item))}>-</span>{item.itemquantity}<span onClick={()=>dispatch(additem(item))}>+</span></td>
                                        <td>{item.itemquantity * item.price}</td>
                                        <td><button onClick={()=>dispatch(removefromcart(item))}><MdDelete size={30}/></button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className={styles.summery}>
                        <button onClick={()=>dispatch(clearcart())}>Clear Cart</button>
                        <div className={styles.checkout}>
                            <Link to="/#products">&larr; Continue Shopping</Link> 
                            <Card style={styles.summerycard}>
                                <p>
                                    <b> {`Cart item(s): ${quantity}`}</b>
                                </p>
                                <div className={styles.totalprice}>
                                    <h4>Subtotal</h4>
                                    <h3><b>{`$${prices.toFixed(2)}`}</b></h3>
                                </div>
                                <p>Tax an shipping calculated at checkout</p>
                                <button onClick={postorder}>Checkout</button>
                            </Card>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
export default Cart