import AddToCart from "@/features/add-to-cart/AddToCart"
import Image from "@/shared/ui/Image"
import TextContainer from '@/shared/ui/TextContainer'
import styles from './ItemInfo.module.scss'

const ItemInfo = (props) => {
    const {
        id,
        image_url,
        name,
        price,
        quantity,
        description,
    } = props

    return (
        <div className={styles['item-info']}>
            <Image image_url={image_url} className='item-page'/>
            <div className={styles['product-container']}>
                <div className={styles['name-container']}>
                    <span className={styles['name']}>{ name }</span>
                    { quantity > 0 ? <span className={styles['in-stock']}>Є у наявності</span> : <span className={styles['out-stock']}>Немає у наявності</span> }
                </div>
                <div className={styles['add-to-cart-container']}>
                    <AddToCart id={id} price={price} />
                </div>
                {description &&
                    <TextContainer text={description} className='item-description'/>
                }
            </div>
        </div>
    )
}

export default ItemInfo