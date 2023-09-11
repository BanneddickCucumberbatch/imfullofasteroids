import styles from "./aim.module.scss"

const Aim = ({size}) => {
    return ( 
        <div className={size === "small" ? styles['custom-loader-small'] : styles['custom-loader']}
             >

        </div>
     );
}
 
export default Aim;

// style={size === "small" ? {width: 20, height:20} : {width: 30, height: 30}}