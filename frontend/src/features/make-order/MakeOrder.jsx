import Button from "@/shared/ui/Button"
import TextContainer from "@/shared/ui/TextContainer"
import styles from './MakeOrder.module.scss'
import { useState } from "react"
import Input from "@/shared/ui/Input"
import { useMakeOrderMutation } from "@/shared/api/carts"

const MakeOrder = (props) => {
    const {
        price
    } = props

    const [isShowDetails, setIsShowDetails] = useState(false)

    const [country, setCountry] = useState(null)
    const [city, setCity] = useState(null)
    const [street, setStreet] = useState(null)
    const [house, setHouse] = useState(null)
    const [apartment, setApartment] = useState(null)
    const [postal_code, setPostalCode] = useState(null)

    const [makeOrder] = useMakeOrderMutation()

    const handleMakeOrder = async () => {

        if (isShowDetails === false && price > 0)
        {
            setIsShowDetails(true)
            return
        }

        if (price === 0)
            return

        try {
            const data = await makeOrder({
                country,
                city,
                street,
                house,
                apartment,
                postal_code
            }).unwrap()
            
            setCountry("")
            setCity("")
            setStreet("")
            setHouse("")
            setApartment("")
            setPostalCode("")
            setIsShowDetails(false)

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={styles['make-order']}>
            <TextContainer text='Оформити замовлення' className='make-order-title'/>
            <TextContainer text={`${price} грн`} className='make-order-price' />
            {isShowDetails &&
            <>
                <Input value={country} onChange={(e) => setCountry(e.target.value)} placeholder='Країна*' type='text' className='order-details'/>
                <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder='Місто*' type='text' className='order-details'/>
                <Input value={street} onChange={(e) => setStreet(e.target.value)} placeholder='Вулиця*' type='text' className='order-details'/>
                <Input value={house} onChange={(e) => setHouse(e.target.value)} placeholder='Дім*' type='text' className='order-details'/>
                <Input value={apartment} onChange={(e) => setApartment(e.target.value)} placeholder='Квартира' type='text' className='order-details'/>
                <Input value={postal_code} onChange={(e) => setPostalCode(e.target.value)} placeholder='Поштовий індекс*' type='text' className='order-details'/>
            </>
            
            }
            <Button onClick={handleMakeOrder} text='Замовити' className='make-order'/>
        </div>

    )
}

export default MakeOrder