import React from "react";
import styles from "./Infobox.module.css"
const Infobox =(props)=>{
    return(
        <div className={`${styles.box} ${props.style}` }>
            <p>{props.title}</p>
            <div className={styles.content}>
                <p>{props.num}</p>
                {props.icon}
            </div>
        </div>
    )
}
export default Infobox