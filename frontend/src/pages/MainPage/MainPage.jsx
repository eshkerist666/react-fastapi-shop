import Header from "@/widgets/Header"
import Products from "@/widgets/Products"
import Sidebar from "@/widgets/Sidebar"
import styles from './MainPage.module.scss'
import ChangePage from "@/features/change-page"

const MainPage = () => {
    return (
        <div className={styles.page}>
            <Header />
            <div className={styles['body-container']}>
                <Sidebar />
                <div className={styles['products-container']}>
                    <Products />
                    <ChangePage />
                </div>
            </div>
        </div>
    )
}

export default MainPage