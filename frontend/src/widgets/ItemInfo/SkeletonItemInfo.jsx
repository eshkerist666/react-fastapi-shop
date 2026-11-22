import styles from './SkeletonItemInfo.module.scss'

const SkeletonItemInfo = () => {
    
    return (
        <div className={styles['item-info']}>
            <div className={styles['skeleton-image']}></div>
                <div className={styles['product-container']}>
                    <div className={styles['skeleton-name']}>
                        
                    </div>
                    <div className={styles['skeleton-price']}>
                        
                    </div>

                    <div className={styles['skeleton-price']}> 
 
                    </div>
                </div>
        </div>
    )
}

export default SkeletonItemInfo