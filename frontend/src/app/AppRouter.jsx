import { Route, Routes } from 'react-router'
import MainPage from '@/pages/MainPage'
import ItemPage from '@/pages/ItemPage'
import CartPage from '@/pages/CartPage'
import OrderPage from '@/pages/OrderPage'

const AppRouter = () => {
    
    return (
        <Routes>
            <Route index element={<MainPage />} />
            <Route path="item/:product_id" element={<ItemPage />}/>
            <Route path="cart" element={<CartPage />}/>
            <Route path="orders" element={<OrderPage />}/>
        </Routes>
    )
}

export default AppRouter