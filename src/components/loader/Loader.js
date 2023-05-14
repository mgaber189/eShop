import loadingimg from '../../assets/loader.gif';
import styles from './Loader.module.css'
import ReactDOM from "react-dom"
function Loader() {
  return ReactDOM.createPortal (
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loadingimg} alt="loading...."/>
      </div>
    </div>
    ,document.getElementById('loader')
  )
}

export default Loader
