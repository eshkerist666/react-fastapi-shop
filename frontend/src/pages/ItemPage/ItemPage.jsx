import { useParams } from "react-router"
import Header from "@/widgets/Header"
import { ItemInfo,  SkeletonItemInfo } from "@/widgets/ItemInfo"
import styles from './ItemPage.module.scss'
import { useGetProductQuery } from "@/shared/api/products"

const ItemPage = () => {
    const { product_id } = useParams()

    const { data, error, isLoading } = useGetProductQuery(product_id)

    const product = data ?? []

    return (
        <div className={styles.page}>
            <Header />
            <div className={styles['body-container']}>
                { isLoading ? 
                <SkeletonItemInfo />
                :
                <ItemInfo  
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    quantity={product.quantity}
                    image_url={product.image_url}
                />
                }
            </div>
        </div>
    )
}

export default ItemPage