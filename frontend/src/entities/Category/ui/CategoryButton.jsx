import styles from './CategoryButton.module.scss'

const CategoryButton = (props) => {
    const {
        text,
        onClick
    } = props

    return (
        <button onClick={onClick} className={styles['category-button']}>{ text }</button>
    )
}

export default CategoryButton