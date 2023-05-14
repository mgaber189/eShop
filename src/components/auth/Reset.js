import {useState} from 'react'
import Card from '../ui/Card';
import styles from './auth.module.css';
import registerimg from '../../assets/register.png'
import {Link} from 'react-router-dom'
import Loader from '../loader/Loader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendPasswordResetEmail} from 'firebase/auth';
import {auth} from '../../firebase/config'
function Reset() {
  const [email,setEmail]=useState("");
  const [isLoading , setisLoading]=useState(false);
  const onresethandler=(e)=>{
    e.preventDefault();
    setisLoading(true);
    sendPasswordResetEmail(auth, email)
    .then(() => {
      setisLoading(false);
      toast.success("check your Email inbox")
    })
    .catch((error) => {
      setisLoading(false)
      toast.error(error.message)
    });

  }
  return (
    <>
      <ToastContainer/>
      {isLoading && <Loader/>}
      <section className={styles.container}>
              <div className={styles.image}>
                  <img src={registerimg} alt='login' width="90%"></img>
              </div>
              <Card style={styles.logincard}>
                  <h2>Register</h2>
                  <form onSubmit={onresethandler}>
                      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' required/>
                      <button type='submit' className={styles.loginbutton}>Reset Password</button>
                  </form>
                  <p style={{display:'flex',justifyContent:'space-between',margin:'10px 15px'}}>
                      <Link to='/login' className={styles.register}>-Login</Link>
                      <Link to='/register' className={styles.register}>-Register</Link>
                  </p>
              </Card>
      </section>
    </>
  )
}

export default Reset
