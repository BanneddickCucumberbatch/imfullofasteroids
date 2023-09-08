import styles from "./orderButton.module.scss"

const OrderButton = ({buttonText, onClickHandler, onMouseOverHandler, onMouseLeaveHandler, disabled, gotClassName}) => {
    return ( 
        <button className={styles[`${gotClassName}`]}
                onClick={onClickHandler}
                onMouseOver={onMouseOverHandler}
                onMouseLeave={onMouseLeaveHandler}
                disabled={disabled}>
                {buttonText}    
        </button>
     );
}
 
export default OrderButton;