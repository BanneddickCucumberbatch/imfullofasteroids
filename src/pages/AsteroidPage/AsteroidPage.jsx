import { useEffect, useState } from "react";
import { getAsteroidApproach } from "../../services/asteroidsService";
import {  useParams } from "react-router-dom";
import styles from "./asteroidPage.module.scss";
import { ReactComponent as Calendar } from "./../../assets/img/calendar.svg"
import { ReactComponent as Distance } from "./../../assets/img/distance.svg"
import { ReactComponent as Speed } from "./../../assets/img/speed.svg"
import { ReactComponent as Orbit } from "./../../assets/img/orbit.svg"
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import Loader from "./../../components/Loader/Loader"

const AsteroidPage = () => {

    const params = useParams()
    const [asteroidData, setAsteroidData] = useState(null)
    const [approachesList, setApproachesList] = useState([])

    const orbitsMap = {
        "Earth": "Земля",
        "Juptr": "Юпитер",
        "Venus": "Верера",
        "Merc": "Меркурий",
        "Mars": "Марс"
      };
  
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

    const dateHelper = (date) => {
        const dateInstance = new Date(date)
        return `${dateInstance.getDate()} ${monthMap[dateInstance.getMonth() + 1]} ${dateInstance.getFullYear()}`
      }

      useEffect( () => {
        getAsteroidApproach(params.id).then(item => {
            setAsteroidData(item)
            setApproachesList(item.close_approach_data)
        })
      },[])

    
    return ( 
        asteroidData 
        ? <div className={styles.container}>
            <Link to="/" className={styles.link}>← К списку астероидов</Link>
            <h2 className={styles.approachHeading}>{asteroidData.name.slice(1, -1)}</h2>
            { approachesList.map((approach) => (
              <div
                key={approach.epoch_date_close_approach}
                className={styles.approachesListContainer}
              >
                <div className={styles.approachesListItem}> 
                  <span data-tooltip-id="approachDate" data-tooltip-content="Дата максимального сближения" data-tooltip-place="top"><Calendar /></span>
                  <span>{dateHelper(approach.close_approach_date_full)}</span>
                  
                </div>
                <div className={styles.approachesListItem}>
                  <span data-tooltip-id="approachDistance" data-tooltip-content="Расстояние до Земли" data-tooltip-place="top"><Distance /></span>
                  <span>{Math.round(approach.miss_distance.kilometers).toLocaleString("ru")} км</span>
                  
                </div>
                <div className={styles.approachesListItem}>
                  <span data-tooltip-id="approachSpeed" data-tooltip-content="Скорость относительно Земли" data-tooltip-place="top"><Speed /></span>
                  <span>{Math.round(approach.relative_velocity.kilometers_per_hour)} км/ч</span>
                   
                </div>
                <div className={styles.approachesListItem}> 
                  <span data-tooltip-id="approachOrbit" data-tooltip-content="Орбита" data-tooltip-place="top"><Orbit /></span>
                  <span>{orbitsMap[approach.orbiting_body]}</span>
                  
                </div>
              </div>
            ))}
            <Tooltip id="approachDate" />
            <Tooltip id="approachDistance" />
            <Tooltip id="approachSpeed" />
            <Tooltip id="approachOrbit" />
          </div>
        : <Loader />
     );
}
 
export default AsteroidPage;