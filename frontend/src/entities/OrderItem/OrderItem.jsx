import TextContainer from '@/shared/ui/TextContainer'
import styles from './OrderItem.module.scss'
import { useState } from 'react'
import Image from '@/shared/ui/Image'
import { NavLink } from 'react-router'

const OrderItem = (props) => {
    const {
        id,
        items,
    } = props

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleClose = () => {
        setIsModalOpen(false)
    }


    console.log(items)
    return (
        <>
            <div className={styles['order-item']}>
                <TextContainer text={`Замовлення №${id}`} className='order-item-title'/>
                <TextContainer text="Інформація про замовлення" onClick={() => setIsModalOpen(true)} className='order-info'/>
                
            </div>
             {isModalOpen && (
                <div
                    className={styles.overlay}
                    onClick={handleClose}
                >
                    <div
                        className={styles.modal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className={styles.close}
                            onClick={handleClose}
                        >
                            ×
                        </button>

                        <TextContainer text={`Замовлення №${id}`} className='order-item-title'/>

                        <div className={styles['modal-content']}>
                            {items.map(item => (
                                <div
                                    key={item.id}
                                    className={styles['modal-item']}
                                >
                                    <Image image_url={item.image_url} className='cart-item'/>

                                    <NavLink className={styles.link} to={`/item/${item.item_id}`} end>
                                        <div className={styles['name-container']}>
                                            <span>{item.name}</span>
                                        </div>
                                    </NavLink>
                                    
                                    <span>Кількість: {item.quantity}</span>
                                    <span>
                                        {item.price / 100} грн
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default OrderItem