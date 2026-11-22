import styles from './IconSvg.module.scss'

const IconSvg = (props) => {
    const {
        children,
        className,
        onClick
    } = props

    return (
        <div className={styles[className]} onClick={onClick}>
            {children}
        </div>
    )
}

export default IconSvg