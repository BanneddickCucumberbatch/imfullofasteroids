import { useState, useEffect } from "react";
import styles from "./mainLayout.module.scss";
import { throttle } from "../../helpers/scrollThrottler";

const MainLayout = ({children}) => {

    const [y, setY] = useState(0);
    

    const handleScrollUpClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    useEffect(() => {
      const scrollHandler = () => {
        setY(window.scrollY);
      };

      window.addEventListener("scroll", throttle(scrollHandler, 500));
      return () => {
        window.removeEventListener("scroll", throttle(scrollHandler));
      };
    }, []);

    return (
        <div className="mainContainer">
            <header className="header">
                <h1 className="mainHeading">Пиу-пиу!</h1>
                <p className="mainDesc">Меньше астероидов - спокойней на душе</p>
            </header>
            <main>{children}</main>
            <footer className="footer">
                <p>Все права и жители планеты защищены</p>
            </footer>
            <div className={y > 1200 ? styles.arrowTop : styles.arrowTopHidden} onClick={handleScrollUpClick}></div>
        </div> 
     );
}
 
export default MainLayout;