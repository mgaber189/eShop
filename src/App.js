import './App.css';
import {Route , Routes } from 'react-router-dom'
import Home from './pages/home/Homepage';
import Contact from './pages/contact/Contact';
import NavBar from './components/navbar/NavBar';
import Footer from './components/footer/Footer';
import Loginpage from './pages/login/Loginpage';
import Register from './pages/register/Registerpage'
import Resetpage from './pages/reset/Resetpage';
import Cartpage from './pages/cart/Cartpage';
import Productdetails from './components/product/productdetails/Productdetails';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {getProducts} from "./redux/slice/productslice";
import {getorders} from "./redux/slice/orderslice"
import Orderhistory from './components/orders/Orderhistory';
import Orderdetails from './components/orders/Orderdetails';
import Checkout from './components/Checkout/Checkout';
import Onlyadmin from './components/onlyadmin/Onlyadmin';
import Admin from './components/admin/Admin';
function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getProducts());
    dispatch(getorders())
  },[dispatch])
  return (
    <>
      <NavBar/>
      <Onlyadmin/>
      <Routes>
        <Route path='/admin/*' element={
        <Onlyadmin>
          <Admin/>
        </Onlyadmin>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/' element={<Loginpage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/reset' element={<Resetpage/>}/>
        <Route path='/cart' element={<Cartpage/>}/>
        <Route path='/orders' element={<Orderhistory/>}/>
        <Route path='/orderdetails/:id' element={<Orderdetails/>}/>
        <Route path='/productdetails/:id' element={<Productdetails/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='*' element={<Home/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
