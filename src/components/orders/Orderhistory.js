import React from "react";
import styles from "./Orderhistory.module.css"
import {ordershistory} from "../../redux/slice/orderslice"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Orderhistory=()=>{
    const orders = useSelector(ordershistory)
    const navigate = useNavigate();
    const toorderdetail=(id)=>{
        navigate(`/orderdetails/${id}`);
    }
    return(
        <div className={styles.container}>
            <h2>Order History</h2>
            <>
            <table>
                <thead>
                    <tr>
                        <th>s/n</th>
                        <th>Date</th>
                        <th>Order ID</th>
                        <th>Order Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order,index)=>{
                        return(
                            <tr key={index} className={styles.pointerrow} onClick={()=>toorderdetail(order.id)}>
                                <td>{index}</td>
                                <td>
                                    {order.orderdate}
                                </td>
                                <td>{order.id.substring(0,10)}....</td>
                                <td>{order.orderamount}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </>
        </div>
    );
}
export default Orderhistory