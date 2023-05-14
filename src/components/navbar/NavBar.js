import {React , useState ,useEffect} from 'react'
import styles from './NavBar.module.css';
import {Link,NavLink,useNavigate} from 'react-router-dom'
import {FaShoppingCart} from 'react-icons/fa';
import {GiHamburgerMenu} from 'react-icons/gi';
import {CgProfile} from  'react-icons/cg'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../../firebase/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch,useSelector } from 'react-redux';
import { setActiveUserHandler,removeActiveUserHandler } from '../../redux/slice/authslice';
import { cartquantity}from "../../redux/slice/cartslice"
import {Adminlink}from "../onlyadmin/Onlyadmin"
function NavBar() {
    const [sidenav,setsidenav]=useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedin=useSelector(state=>state.auth.isLoggedin);
    const displayName = useSelector(state=>state.auth.userName)
    const cartnumber=useSelector(cartquantity)
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setActiveUserHandler({
                    email:user.email,
                    userName:user.displayName,
                    userId:user.uid
                }))
            } else {
                dispatch(removeActiveUserHandler());
            }
          });

    },[dispatch,displayName])
    const showsidenav =()=>{
        setsidenav(!sidenav);
    }
    const activelink=({isActive})=>(isActive ? `${styles.active}`:`${styles.navlinks}`)
    const logouthandler=()=>{
        signOut(auth).then(() => {
            navigate("/");
            toast.success("logout succeessful...")
        }).catch((error) => {
            toast.error(error.message)
        });
    }
  return (
    <>
        <ToastContainer/>
        <div className={styles.nav}>
            <div>
                <Link to="/home" className={styles.logolink}>
                    e<span>Shop</span>.
                </Link>
            </div>
            <div className={styles.rightnav + ` ${sidenav ? styles.shownav : ""}`}>
            <div className={styles.hidelogo}>
                <Link to="/" className={styles.logolink}>
                    e<span>Shop</span>.
                </Link>
                <h2 onClick={showsidenav} className={styles.menuicon}>X</h2>
            </div>
                {isLoggedin &&
                <ul className={styles.list}>
                    <li>
                        <Adminlink>
                            <NavLink to='/admin/home' className={activelink}>Admin</NavLink>
                        </Adminlink>
                    </li>
                    <li>
                        <NavLink to='/home' className={activelink}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/contact' className={activelink}>Contact us</NavLink>
                    </li>
                </ul>
                }
                <ul className={styles.list}>
                    {!isLoggedin &&
                    <li>
                        <NavLink to='/' className={activelink}>Login</NavLink>
                    </li>
                    }
                    {isLoggedin && 
                    <li>
                        <NavLink to='/home' className={activelink}><CgProfile/>Hi {displayName}</NavLink>
                    </li>
                    }
                    {!isLoggedin &&
                    <li>
                        <NavLink to='/register' className={activelink}>Register</NavLink>
                    </li>
                    }
                    {isLoggedin &&
                    <li>
                        <NavLink to='/orders' className={activelink}>My Orders</NavLink>
                    </li>
                    }
                    {isLoggedin &&
                    <li>
                        <NavLink to='/' className={activelink} onClick={logouthandler}>Logout</NavLink>
                    </li>
                    }
                    {isLoggedin &&
                    <li>
                        <NavLink to='/cart' className={styles.navlinks}>
                            Chart
                            <FaShoppingCart size={20}/>
                            <span><b>{cartnumber}</b></span>
                        </NavLink>
                    </li>
                    }
                </ul>
            </div>
            <GiHamburgerMenu size={25} className={styles.menuicon} onClick={showsidenav}/>
        </div>
        <div className={`${sidenav ? styles.shadow : " "}`} onClick={showsidenav}></div>
    </>
  )
}

export default NavBar
