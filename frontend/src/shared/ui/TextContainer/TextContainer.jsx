import styles from './TextContainer.module.scss'

const TextContainer = (props) => {
    const {
        className,
        text,
        onClick,
    } = props

    return (
        <div className={styles[className]} onClick={onClick}>
            <span>{ text }</span>
        </div>
    )
}

export default TextContainer