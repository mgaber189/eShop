import React, { useEffect } from "react";
import Infobox from "../../ui/Infobox";
import styles from "./Home.module.css"
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import {products} from "../../../redux/slice/productslice"
import {ordershistory,earning,calcearning} from "../../../redux/slice/orderslice"
import { useSelector , useDispatch } from "react-redux";
import Chart from "../chart/Chart"
const Home =()=>{
    const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />;
    const productIcon = <BsCart4 size={30} color="#1f93ff" />;
    const ordersIcon = <FaCartArrowDown size={30} color="orangered" />
    const dispatch = useDispatch();
    const product = useSelector(products);
    const orders = useSelector(ordershistory);
    const earn=useSelector(earning)
    useEffect(()=>{
        dispatch(calcearning());
    })
    return (
        <div className={styles.container}>
            <h2>Admin Home</h2>
            <div className={styles.infobox}>
                <Infobox title="Earning" icon={earningIcon} num={earn} style={styles.card1} />
                <Infobox title="Products" icon={productIcon} num={product.length} style={styles.card2} />
                <Infobox title="Orders" icon={ordersIcon} num={orders.length} style={styles.card3} />
            </div>
            <div className={styles.chart}>
                <Chart order={orders}/>
            </div>
        </div>
    )
}
export default Home