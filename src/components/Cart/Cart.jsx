import styles from "./cart.module.scss";
import OrderButton from "../../UI/OrderButton/OrderButton";
import { useState, useEffect } from "react";
import asteroidPic from "./../../assets/img/asteroid.png";
import { ReactComponent as Trash } from "./../../assets/img/trash.svg";
import { getNoun } from "../../helpers/orfography";
import { Link } from "react-router-dom";



const Cart = ({ orders, onDelete, onClear }) => {

    const [open, setOpen] = useState(false);
  
  useEffect(() => {
    !Array.from(orders).length && setOpen(false)
  },[orders]);

    return ( 
        <>
      <div
      className={styles.basketContainer}
    >
      <h2 className={styles.basketHeading}>корзина</h2>
      <div className={styles.basketContent}>
        {!Array.from(orders).length 
        ? <div className={styles.emptyBasketWarning}>Серьезно? Хочешь столкновения?</div> 
        : <div className={styles.basketItemCountContainer}>
        <span className={styles.basketItemsCount}>
          {Array.from(orders).length} 
        </span>
        <span
          className={styles.basketItemText}
          onClick={() => setOpen(!open)}
        >
          {getNoun(Array.from(orders).length, "астероид", "астероида", "астероидов")}
        </span>
      </div>
        }
        
        {open && (
          <div>
            {orders.map((order) => (
              <div className={styles.basketItemContainer} key={order.name}>
                <span>
                  <img
                    src={asteroidPic}
                    width={16}
                    height={16}
                    alt="asteroid"
                  />
                </span>
                <div
                  
                  style={{ display: "block" }}
                >
                  {order.name}
                </div>
                <span  onClick={() => onDelete(order.id)}>
                  <Trash className={styles.backetItemDeleteIcon}  alt="x-mark icon" />
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.orderButton} style={!Array.from(orders).length ? {display: "none"} : null}>
        <Link to="/order">
            <OrderButton buttonText="заказать" gotClassName='orderButton' />
        </Link>
        
        <p className={styles.cleanCart} onClick={onClear}>Очистить корзину</p>
      </div>
      
    </div>

      <div className={styles.basketMobileContainer}>
        <h2 className={styles.basketHeading}>корзина</h2>
        <div> 
          {!Array.from(orders).length 
          ? <div className={styles.emptyBasketWarning}>Серьезно? Хочешь столкновения?</div> 
          : <div className={styles.basketItemCountContainer}>
              <span className={styles.basketItemsCount}>
                {Array.from(orders).length} 
              </span>
              <span className={styles.basketItemText}>
                {getNoun(Array.from(orders).length, "астероид", "астероида", "астероидов")}
              </span>
            </div>}
        </div>
            <div className={styles.orderButton}>
            
              <Link to="/order">
              <OrderButton buttonText="заказать" gotClassName='orderButton' />
              </Link>
            </div>
            
        
        
      </div>
    </>
     );
}
 
export default Cart;