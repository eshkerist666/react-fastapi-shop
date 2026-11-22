import Header from '@/widgets/Header'
import styles from './OrderPage.module.scss'
import TextContainer from '@/shared/ui/TextContainer'
import OrderItems from '@/entities/OrderItems'
import { useGetOrdersQuery } from '@/shared/api/orders'

const OrderPage = () => {
    const { data, error, isLoading } = useGetOrdersQuery()

    const total = data?.total ?? ""

    return (
        <div className={styles.page}>
            <Header />
            <div className={styles['body-container']}>
                <div className={styles['orders-container']}>
                    <TextContainer text="Замовлення" className="cart-title"/>
                    <div className={styles.orders}>
                        <TextContainer text={`Всього замовлень: ${total}`} className='order-count'/>
                        <hr />
                        <OrderItems />
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default OrderPage