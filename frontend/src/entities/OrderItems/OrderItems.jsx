import { useGetOrdersQuery } from '@/shared/api/orders'
import styles from './OrderItems.module.scss'
import OrderItem from '../OrderItem/OrderItem'

const OrderItems = () => {
    const { data, error, isLoading } = useGetOrdersQuery()

    const orders = data?.orders ?? []

    console.log(data)
    return (
        <div>
            {
                orders.map((item) => (
                    <OrderItem 
                        key={item.id}
                        items={item.items}
                        id={item.id}
                    />
                ))
            }
        </div>
    )
}

export default OrderItems