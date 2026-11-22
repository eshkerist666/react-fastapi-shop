import styles from './SkeletonProductItem.module.scss'

const SkeletonProductItem = () => {
    return (
            <div className={styles['product-item']}>
                <div className={styles['skeleton-image']}></div>

                <div className={styles['name-container']}>
                    <div className={styles['skeleton-name']}></div>
                </div>

                <div className={styles['price-container']}>
                    <div className={styles['skeleton-price']}></div>
                </div>
            </div>
    )
}

export default SkeletonProductItem

