import React, { useEffect, useState } from "react";
import styles from "../styles/Scroll.module.css"
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';


export default function Scroll(props) {

  const [scrollUpBtn, setScrollUpBtn] = useState(false)

  function scrollTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  useEffect(function onFirstMount() {
    let isMounted = true;
    let oldValue = 0
    let newValue = 0

    window.addEventListener('scroll', () => {
    newValue = window.pageYOffset;
      setScrollUpBtn(false)
      if (newValue > 70 && isMounted) {
        setScrollUpBtn(true)
      } 
      oldValue = newValue;
      });

    return () => { isMounted = false }
  }, []);

  return (
    <div>
      {scrollUpBtn ?
        <div onClick={scrollTop} className={styles.scroller}>
          <div className={styles.arrowIcon}>
          <ArrowUpwardIcon />
          </div>
        </div> 
      :
        null}
    </div>
  );
}