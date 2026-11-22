import CartItem from "@/entities/CartItem/ui/CartItem"
import { useSelector } from 'react-redux'
import styles from './CartItems.module.scss'

const CartItems = (props) => {
    const {
        items
    } = props

    const cart = useSelector(state => state.cart)

    return (
        <div className={styles['cart-items-container']}>
            {
            items.map((item) => (
                    <CartItem 
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        item_quantity={item.cart_quantity}
                        image_url={item.image_url}
                        price={item.price / 100}
                    />
                ))
            }
        </div>
    )
}

export default CartItems