import styles from './LoadingSpinner.module.css';

const LoadingSpinner = ({small = false})=>(
    <div className={`${styles.spinner} ${small? styles.small:''}`}></div>
)

export default LoadingSpinner;