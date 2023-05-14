import React, { useRef } from 'react'
import Card from '../../components/ui/Card'
import styles from './Contact.module.css'
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify";
function Contact() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_09bodhq', 'template_lpsnfnt', form.current, 'fyfrVcUFeuMsz3hsx')
      .then((result) => {
          toast.success( "Email sended", {
            position: "top-right",
        });

      }, (error) => {
          toast.success( `${error.text}`, {
            position: "top-right",
        });
      });
    e.target.reset();
  };
  return (
    <div className={styles.container}>
      <h2>Conatct Us</h2>
      <div className={styles.containt}>
        <Card style={`${styles.card} ${styles.contactform}`}>
          <form ref={form} onSubmit={sendEmail}>
            <label>Name :</label>
            <input type="text" placeholder='Full Name'/>
            <label>Email :</label>
            <input type="email" placeholder='Your active email'/>
            <label>Subject :</label>
            <input type="text" placeholder='Subject'/>
            <label>Your message :</label>
            <textarea name="message" cols="30" rows="10"></textarea>
            <button className={styles.submitbtn}>Send Message</button>
          </form>
        </Card>
        <Card style={`${styles.card} ${styles.contactinfo}`}>
          <p className={styles.infotitle}>Our Contact Information</p>
          <p>Fill the form or contact us via other channels listed below</p>
          <br/>
          <p><FaPhoneAlt/> 01125992923</p>
          <p><FaEnvelope/> mg3845617@gmail.com</p>
          <p><FaTwitter/> @Mohamed82062811</p>
          <p><GoLocation/> Gharbia , Tanta</p>
        </Card>     
      </div>
    </div>
  )
}

export default Contact
