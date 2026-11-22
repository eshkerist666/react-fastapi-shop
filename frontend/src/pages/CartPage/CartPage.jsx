import CartItems from '@/entities/CartItems/ui/CartItems'
import MakeOrder from '@/features/make-order/MakeOrder'
import TextContainer from '@/shared/ui/TextContainer'
import Header from '@/widgets/Header'
import { useGetCartItemsQuery } from '@/shared/api/carts/index'
import { useGetMeQuery } from '@/shared/api/user'

import styles from './CartPage.module.scss'

const CartPage = () => {
    const { data: user } = useGetMeQuery()
    const { data, error, isLoading } = useGetCartItemsQuery(user?.id)

    const items = data?.items ?? []
    const totalPrice = data?.total_price ?? 0

    return (
        <div className={styles.page}>
            <Header />
            <div className={styles['body-container']}>
                <div className={styles['cart-container']}>
                    <TextContainer text='Кошик' className='cart-title'/>
                    <CartItems items={items}/>
                </div>
                <div className={styles['make-order-container']}>
                    <MakeOrder price={totalPrice / 100}/>
                </div>
            </div>
        </div>
    )
}

export default CartPage