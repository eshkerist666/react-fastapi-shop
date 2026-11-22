import Button from "@/shared/ui/Button"
import styles from './AddToCart.module.scss'
import { useAddToCartMutation } from "@/shared/api/carts"
import { useActions } from "@/shared/hooks/useActions"
import { selectGetMeResult } from "@/shared/api/user"
import { useSelector } from "react-redux"

const AddToCart = (props) => {
    const {
        id,
        price
    } = props

    const [addToCart] = useAddToCartMutation()
    const { openAuthModal } = useActions()
    const { data: user, isLoading, error } = useSelector(selectGetMeResult)

    const handleAddToCart = async () => {
        if (isLoading) {
            return
        }

        if (!user || error) {
            openAuthModal('login')
            return
        }

        try {
            const data = await addToCart({
                item_id: id,
                quantity: 1
            }).unwrap()

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={styles['add-to-cart']}>
            <span>
                { price / 100 } грн
            </span>
            <Button onClick={handleAddToCart} text='Купити' className='add-to-cart'/>
        </div>
    )
}

export default AddToCart