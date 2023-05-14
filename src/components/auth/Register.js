import {useState} from 'react'
import Card from '../ui/Card';
import styles from './auth.module.css';
import registerimg from '../../assets/register.png'
import {Link,useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebase/config'
import Loader from '../loader/Loader'
function Register() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [cPassword,setcPassword]=useState("");
  const [isLoading , setisLoading]=useState(false);
  const navigate = useNavigate();
  const registeruser=(e)=>{
    e.preventDefault();
    if(password!==cPassword){
      toast.error("Password don't match")
    }
    setisLoading(true)
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user)
    setisLoading(false)
    toast.success("user added")
    navigate("/login")
  })
  .catch((error) => {
    toast.error(error.message);
    setisLoading(false)
  });
  }
  return (
    <>
      <ToastContainer />
      {isLoading && <Loader/>}
      <section className={styles.container}>
              <Card style={styles.logincard}>
                  <h2>Register</h2>
                  <form onSubmit={registeruser}>
                      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' required/>
                      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' required/>
                      <input type="password" value={cPassword} onChange={(e)=>setcPassword(e.target.value)} placeholder='Confirm Password' required/>
                      <button type="submit" className={styles.loginbutton}>Register</button>
                  </form>
                  <p>
                      Already have an account?
                      <Link to='/login' className={styles.register}>Login</Link>
                  </p>
              </Card>
              <div className={styles.image}>
                  <img src={registerimg} alt='login' width="90%"></img>
              </div>
      </section>
    </>
  )
}

export default Register
