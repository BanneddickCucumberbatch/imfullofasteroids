import { useState } from "react";
import OrderButton from "../../UI/OrderButton/OrderButton";
import styles from "./order.module.scss";
import asteroidPic from "./../../assets/img/asteroid.png";
import { ReactComponent as Trash } from "./../../assets/img/trash.svg";
import { Link } from "react-router-dom";


const Order = ({ orders, onClear, onDelete }) => {

    const [isOrdered, setIsOrdered] = useState(false);

  const orderHandler = () => {
    setIsOrdered(true);
    onClear();
  };


    return isOrdered ? ( 
        <div>
      <h2 className={styles.successMessage}>
        Ваш заказ принят! Ожидайте вспышек в звездном небе!
      </h2>
      <Link to="/" >
        <p className={styles.returnMessage}>← К списку астероидов</p>
      </Link>
    </div>
  ) : !Array.from(orders).length ? (
    <>
      <p className={styles.notification}>Ну уж нет уж, давай-ка заказывай!</p>
      <Link to="/">
        <p className={styles.returnMessage}>← К списку астероидов</p>
      </Link>
    </>
  ) : (
    <div className={styles.orderContainer}>
      <h2 className={styles.orderHeading}>Ваш заказ</h2>
      {orders.map((order) => (
        <div key={order.id} className={styles.orderItem}>
          <div className={styles.orderImage}>
            <img src={asteroidPic} width={50} height={50} alt="asteroid" className={styles.asteroidPic}/>
          </div>
          <div className={styles.orderContent}>
            <div className={styles.orderItemName}>{order.name}</div>
            <div className={styles.orderDate}>{order.date}</div>
            <div className={styles.orderDiameter}>{order.diameter}m</div>
          </div>
          <div
            className={styles.orderDeleteButton}
            onClick={() => onDelete(order.id)}
          >
            <Trash className={styles.trashIcon} />
          </div>
        </div>
      ))}
      <div className={styles.orderButtonArea}>
        <OrderButton
          buttonText="отправить заказ"
          onClickHandler={orderHandler}
          gotClassName={
            Array.from(orders).length ? "orderButton" : "orderButtonDisabled"
          }
          disabled={Array.from(orders).length ? false : true}
        />
      </div>
      <Link to="/">
        <p className={styles.returnMessage}>← К списку астероидов</p>
      </Link>
    </div>
     );
}
 
export default Order;