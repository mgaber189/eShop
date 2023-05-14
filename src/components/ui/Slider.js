import React, { useEffect, useState } from 'react'
import styles from './Slider.module.css'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Loader from '../loader/Loader';
function Slider() {
  const [sliderData,setSliderData]=useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading,setIsLoading]=useState(true);
  const sildeLength=sliderData.length;
  let slideInterval;
  let autoSliding=true;
  useEffect(()=>{
    setCurrentSlide(0);
    const fetchSliderData= async ()=>{
      const response=await fetch("https://e-commerce-f10ff-default-rtdb.firebaseio.com/slider.json")
      if(!response.ok){
        setIsLoading(false);
        throw new Error("There is something wrong");
      }
      const data=await response.json();
      const loadedData=[];
      for(const key in data){
        loadedData.push({
          id:key,
          desc:data[key].desc,
          image:data[key].image,
          heading:data[key].heading
        })
      }
      setSliderData(loadedData);
      setIsLoading(false);
    }
    fetchSliderData()
  },[])
    const prevSlide=()=>{
      setCurrentSlide(currentSlide===0?sildeLength-1:currentSlide-1);
    }
    const nextSlide=()=>{
      setCurrentSlide(currentSlide===sildeLength-1?0:currentSlide+1)
    }
    useEffect(()=>{
      if (autoSliding){
        const autoSlide=()=>{
          slideInterval = setInterval(nextSlide,5000);
        }
        autoSlide();
      }
      return ()=>clearInterval(slideInterval);
    },[slideInterval,currentSlide])
  return (
  <>
    {isLoading && <Loader/> }
    <div className={styles.slider}>
      <AiOutlineArrowLeft className={`${styles.arrow} ${styles.prev}`} onClick={prevSlide} />
      <AiOutlineArrowRight className={`${styles.arrow} ${styles.next}`} onClick={nextSlide} />
      {sliderData.map((slide,index)=>{
        const { image, heading, desc } = slide;
        return(
          <div key={index} className={index === currentSlide ? `${styles.slide} ${styles.current}` : `${styles.slide}`}>
            {index === currentSlide && (
              <>
                <img src={image} alt="slide" width="100%"/>
                <div className={styles.content}>
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr/>
                  <br/>
                  <a href="#product" className={styles.btn}>
                        Shop Now
                  </a>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  </>
  )
}

export default Slider
