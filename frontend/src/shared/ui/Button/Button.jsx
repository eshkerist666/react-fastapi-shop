import styles from './Button.module.scss'

const Button = (props) => {
    const {
        type,
        text,
        style,
        className,
        disabled=false,
        onClick,
    } = props

    return (
        <button onClick={onClick} disabled={disabled} type={type} className={`${styles.button} ${styles[className]}`} style={style}>
            {text}
        </button>
    )
}

export default Button