import { useState } from "react";
import styles from "./asteroidItem.module.scss";
import asteroidPic from "./../../assets/img/asteroid.png";
import Aim from "../../UI/Aim/Aim";
import { ReactComponent as HazardPic } from "./../../assets/img/hazard.svg";
import { getNoun } from "./../../helpers/orfography";
import OrderButton from "./../../UI/OrderButton/OrderButton"
import { Link } from "react-router-dom";

const AsteroidItem = ({
    name,
    diameter,
    hazard,
    date,
    distanceInKilometers,
    distanceInLunar,
    toggler,
    id,
    onOrder,
    disabled,}) => {

      const monthMap = {
        1: "января",
        2: "февраля",
        3: "марта",
        4: "апреля",
        5: "мая",
        6: "июня",
        7: "июля",
        8: "августа",
        9: "сентября",
        10: "октября",
        11: "ноября",
        12: "декабря",
      }


    const getValidDate = (day) => {
            const theDate = new Date(day);
            const theDay = theDate.getDate();
            const theMonth = theDate.getMonth() + 1;
            const theYear = theDate.getFullYear();
            let validDate = `${theDay} ${monthMap[theMonth]} ${theYear}`;
            
            return validDate;
          };
    const [hover, setHover] = useState(false);

    return ( 
        <div className={styles.listItem} id={id} >
        <div className={styles.itemDate}>{getValidDate(date)}</div>
        <div className={styles.contentContainer}>
          <div className={styles.leftColumn}>
            {toggler === "kilometers" && (
              <div>{distanceInKilometers.toLocaleString("ru")} км</div>
            )}
            {toggler === "lunar" && <div>{distanceInLunar} { getNoun(distanceInLunar, "лунная орбита", "лунные орбиты", "лунных орбит")} </div>}
            <div className={styles.arrow}></div>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.itemName}>
              <div className={styles.itemLink}>
                <Link to={`/${id}`} >{name}</Link>
              </div>
              </div>
            <div className={styles.itemDiameter}>
              <span className={styles.itemDiameterIcon}></span>
              <span className={styles.itemDiameterValue}>{diameter} м</span>
            </div>
          </div>
          <div className={styles.itemImage}>
            <img
              src={asteroidPic}
              width={diameter < 100 ? 33 : 55}
              height={diameter < 100 ? 33 : 55}
              alt="asteroid"
              className={diameter < 100 ? styles.asteroidSmallPic : styles.asteroidLargePic}
            />
            {hover ? (
              <div className={styles.aimSpinner}>
                <Aim size={diameter < 100 ? "small" : ""} />
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.itemFooter}>
          <OrderButton
            buttonText={disabled.includes(id) ? "заказан" : "взорвать!"}
            gotClassName={disabled.includes(id) ? "orderButtonDisabled" : "orderButton"}
            onMouseOverHandler={() => setHover(!disabled.includes(id))}
            onMouseLeaveHandler={() => setHover(false)}
            onClickHandler={() => onOrder({ name, id, diameter, date })}
            disabled={disabled.includes(id)}
            
          />
          {hazard && (
            <div className={styles.itemHazardContainer}>
              <span>
                <HazardPic
                  width={20}
                  height={20}
                  alt="hazardous picture"
                  className={styles.itemHazardIcon}
                />
              </span>
              <span className={styles.itemHazardValue}>Опасен</span>
            </div>
          )}
        </div>
      </div>
     );
}
 
export default AsteroidItem;