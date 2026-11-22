import ProductItem from "@/entities/ProductItem/ui/ProductItem"
import SkeletonProductItem from "@/entities/ProductItem/ui/SkeletonProductItem"
import styles from './Products.module.scss'
import { useGetProductsQuery } from "@/shared/api/products"
import { useSelector } from "react-redux"


const Products = () => {
    const categoryId = useSelector(
        state => state.products.categoryId
    )

    const page = useSelector(
        state => state.products.page
    )

    const searchQuery = useSelector(
        state => state.products.searchQuery
    )
    
    const { data, error, isLoading } = useGetProductsQuery({
        categoryId,
        limit: 16,
        offset: page * 16 - 16,
        searchQuery,
    })

    const products = data?.products ?? []

    return (
        <div className={styles['products-container']}>
            {isLoading
                ? Array.from({ length: 8 }).map((_, index) => (
                    <SkeletonProductItem key={index}/>
                ))
                : products.map((product) => (
                    <ProductItem
                        key={product.id}
                        id={product.id}
                        image={product.image_url}
                        name={product.name}
                        price={product.price / 100}
                    />
                ))
            }
        </div>
    )
}

export default Products