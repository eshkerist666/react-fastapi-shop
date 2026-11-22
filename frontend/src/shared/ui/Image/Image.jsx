import styles from './Image.module.scss'

const Image = (props) => {
    const {
        className = 'image-container',
        image_url
    } = props

    return (
        <div className={styles[className]}>
            <img className={styles.img} src={image_url}/>
        </div>
    )
}

export default Image