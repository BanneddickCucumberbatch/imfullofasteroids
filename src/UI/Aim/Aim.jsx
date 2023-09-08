import styles from "./aim.module.scss"

const Aim = ({size}) => {
    return ( 
        <div className={styles['custom-loader']}
             style={size === "small" ? {width: 20, height:20} : {width: 30, height: 30}}>

        </div>
     );
}
 
export default Aim;