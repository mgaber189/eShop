import React from "react";
import styles from "./Checkout.module.css"
import Card from "../ui/Card"
import {cartprice, cartquantity,cartitem} from "../../redux/slice/cartslice"
import { useSelector , useDispatch } from "react-redux";
import {getorders} from "../../redux/slice/orderslice";
import { useNavigate } from "react-router-dom";
import {clearcart} from "../../redux/slice/cartslice"
import { toast } from "react-toastify";
const Checkout =()=>{
    const totalprice = useSelector(cartprice);
    const quantity = useSelector(cartquantity);
    const items = useSelector(cartitem)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    const pay=(e)=>{
        e.preventDefault();
            fetch("https://e-commerce-f10ff-default-rtdb.firebaseio.com/orders.json",{
            method:"POST",
            body:JSON.stringify({
                orderdate:dateTime,
                orderamount:totalprice,
                orderitem:items,
            })
        })
        dispatch(getorders());
        dispatch(clearcart());
        toast.success( "Payment successful", {
            position: "top-right",
        });
        navigate("/home")
    }
    return(
        <div className={styles.container}>
            <h2>Checkout</h2>
            <div className={styles.content}>
                <Card style={styles.checksummery}>
                    <h3>Checkout Summary</h3>
                    <p>{`Cart items (s): ${quantity}`}</p>
                    <div className={styles.totalprice}>
                        <h4>Subtotal</h4>
                        <h3><b>{`$${totalprice.toFixed(2)}`}</b></h3>
                    </div>
                    {items.map((item , index)=>{
                        return(
                            <div key={index} className={styles.summarycard}>
                                <h4>Product : {item.title}</h4>
                                <p>Quantity : {item.itemquantity}</p>
                                <p>Unit Price: {item.price}</p>
                                <p>Set Price : {item.itemquantity * item.price} </p>
                            </div>
                        )

                    })}
                </Card>
                <Card style={styles.paycard}>
                    <h3>Checkout Summary</h3>
                    <form onSubmit={pay}>
                        <label>Card number</label>
                        <input type="text" placeholder="4242 4242 4242 4242"/>
                        <div className={styles.payexpire}>
                            <div>
                                <label>Expiration</label>
                                <input type="text" placeholder="04 / 24"/>
                            </div>
                            <div>
                                <label>CVC</label>
                                <input type="text" placeholder="CVC"/>
                            </div>
                        </div>
                        <label>Country</label>
                        <input type="text" placeholder="Enter Your Country"/>
                        <button type="submit">Pay now</button>
                    </form>
                </Card>
            </div>
        </div>
    )
}
export default Checkout;