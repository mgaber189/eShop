import {useState} from 'react';
import Card from '../ui/Card';
import styles from './auth.module.css';
import loginimg from '../../assets/login.png'
import {Link,useNavigate} from 'react-router-dom'
import {FaGoogle} from 'react-icons/fa'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../loader/Loader'
import { auth } from '../../firebase/config';
function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [isLoading , setisLoading]=useState(false);
    const navigate = useNavigate();
    const loginuser=(e)=>{
        e.preventDefault();
        setisLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            setisLoading(false)
            toast.success("login successful...")
            navigate('/home')
        })
        .catch((error) => {
            toast.error(error.message);
            setisLoading(false)
        });
    }
    const provider = new GoogleAuthProvider();
    const loginwithgoogle=()=>{
        signInWithPopup(auth, provider)
        .then((result) => {
            toast.success("login successful...")
            navigate('/home')

        }).catch((error) => {
            toast.error(error.message);
        });
    }
  return (
    <>
        <ToastContainer/>
        {isLoading && <Loader/>}
        <section className={styles.container}>
            <div className={styles.image}>
                <img src={loginimg} alt='login' width="90%"></img>
            </div>
            <Card style={styles.logincard}>
                <h2>Login</h2>
                <form onSubmit={loginuser}>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' required/>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' required/>
                    <button type='submit' className={styles.loginbutton}>Login</button>
                    <Link to="/reset" className={styles.reset}>Reset Password ?</Link>
                </form>
                <p>--or--</p>
                <button onClick={loginwithgoogle} className={styles.googlelogin}>
                    <FaGoogle size={20} color="white"/>
                    Login with Google
                </button>
                <p>
                    Don't have an account?
                    <Link to='/register' className={styles.register}>Register</Link>
                </p>
            </Card>
        </section>
    </>
  )
}

export default Login
