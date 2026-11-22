import { useCallback, useState } from 'react'
import IconSvg from '@/shared/ui/IconSvg/IconSvg'
import Image from '@/shared/ui/Image'
import Input from '@/shared/ui/Input'
import TextContainer from '@/shared/ui/TextContainer'
import styles from './CartItem.module.scss'
import { useChangeQuantityMutation } from '@/shared/api/carts'

const CartItem = (props) => {
    const {
        id,
        name,
        image_url,
        item_quantity,
        price
    } = props
    
    

    const [quantity, setQuantity] = useState(item_quantity)

    const increaseCounter = useCallback(() => {
        setQuantity(prev => {
            const value = Number(prev)

            return value < 999 ? value + 1 : value
        })
    }, [])

    const decreaseCounter = useCallback(() => {
        setQuantity(prev => {
            const value = Number(prev)

            return value > 1 ? value - 1 : value
        })
    }, [])

    const [changeQuantity] = useChangeQuantityMutation()

    const handleChangeQuantity = async () => {
        try {
            const data = await changeQuantity({
                item_id: id,
                quantity
            }).unwrap()

            setQuantity(data.quantity)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={styles['cart-item']}>
            <Image image_url={image_url} className='cart-item'/>
            <TextContainer className='cart-item-name' text={name}/>

            <div className={styles['counter-container']}>
                <IconSvg className='cart-counter' onClick={decreaseCounter}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                    </svg>
                </IconSvg>

                <Input 
                    value={quantity} 
                    className='cart-counter' 
                    type='number'
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <IconSvg className='cart-counter' onClick={increaseCounter}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </IconSvg>
            </div>

            <TextContainer className='cart-item-price' text={`${ price * quantity } грн`} />

            {
                quantity != item_quantity && 
            <IconSvg className='confirm' onClick={handleChangeQuantity}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            </IconSvg>
            }

            <IconSvg className='delete'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </IconSvg>
        </div>
    )
}

export default CartItem