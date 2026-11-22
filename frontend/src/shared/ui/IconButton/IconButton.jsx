import styles from './IconButton.module.scss'

const IconButton = (props) => {
    const {
        style,
        link,
        onClick
    } = props

    return (
        <div className={styles['icon-container']} style={style} onClick={onClick}>
            <img 
                className={styles.img}
                src={link}
            />
        </div>
    )
}

export default IconButton