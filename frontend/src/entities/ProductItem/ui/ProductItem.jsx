import Image from '@/shared/ui/Image'
import styles from './ProductItem.module.scss'
import { NavLink } from "react-router"

const ProductItem = (props) => {
    const {
        id,
        image,
        name,
        price,
    } = props

    return (
        <div className={styles['product-item']}>
            <NavLink to={`item/${id}`} end>
                <Image image_url={image}/>
            </NavLink>

            <NavLink className={styles.link} to={`item/${id}`} end>
                <div className={styles['name-container']}>
                    <span className={styles.name}>{name}</span>
                </div>
            </NavLink>

            <div className={styles['price-container']}>
                <span className={styles.price}>{price} грн</span>
            </div>
        </div>
    )
}

export default ProductItem