import AsteroidItem from "../AsteroidItem/AsteroidItem";
import { useState } from "react";
import styles from "./asteroidList.module.scss"

const AsteroidList = ({asteroids, onOrder, disabled}) => {

    const [distanceToggle, setDistanceToggle] = useState('kilometers');
    const distanceToggleHandler = (e) => {
        if (e.target.id !== distanceToggle) {
            setDistanceToggle(e.target.id)
        }
    } 
    return ( 
        <div className={styles.listContainer}>
        <h2 className={styles.listHeading}>Ближайшее поступление астероидов:</h2>
        <div className={styles.distanceToggler}>
            <span className={distanceToggle === 'kilometers' ? `${styles.inKilometers} ${styles.activeToggle}` : `${styles.inKilometers}`}
                  id="kilometers"
                  onClick={(e) => distanceToggleHandler(e)}>в километрах</span>
            <span>  |  </span>
            <span className={distanceToggle === 'lunar' ? `${styles.inLunar} ${styles.activeToggle}` : `${styles.inLunar}`}
                  id="lunar"
                  onClick={(e) => distanceToggleHandler(e)}>в лунных орбитах</span>
        </div>
        <ul className={styles.list}>
            {asteroids.map(asteroid => ( 
                <AsteroidItem key={asteroid.id}
                              toggler={distanceToggle}
                              {...asteroid}
                              onOrder={onOrder}
                              disabled={disabled}
                />)
                )}
        </ul>
        
        </div>
     );
}
 
export default AsteroidList;