import styles from './Button.module.css';

const Button = ({text, onclick, varient="basic"})=>{
    return (
        <button onClick={onclick} className={`${styles.button} ${styles[varient]}`}>
            {text}
        </button>
    )
}

export default Button;