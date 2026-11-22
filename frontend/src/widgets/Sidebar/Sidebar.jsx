import CategoryFilter from '@/features/filter-category'
import styles from './Sidebar.module.scss'

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles['category-filter']}>
                <span>Категорії</span>
                <hr />
                <div className={styles['category-list']}>
                    <CategoryFilter />
                </div>
            </div>
        </div>
    )
}

export default Sidebar