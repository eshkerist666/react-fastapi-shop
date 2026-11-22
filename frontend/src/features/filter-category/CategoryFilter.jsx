import CategoryButton from "@/entities/Category"
import { useGetCategoriesQuery } from '@/shared/api/products'
import { useActions } from "@/shared/hooks/useActions"

const CategoryFilter = () => {
    const { data, isLoading } = useGetCategoriesQuery()
    const { setCategoryId, setPage, setSearchQuery } = useActions()
    
    const handleCategoryClick = (category_id) => {
        setSearchQuery(null)
        setCategoryId(category_id)
        setPage(1)
    }

    return (
        <div>
            {!isLoading && data.categories.map((category) => (
                <CategoryButton 
                    key={category.category_id} 
                    text={category.category_name}
                    onClick={() => handleCategoryClick(category.category_id)}
                />
            ))}
        </div>
    )
}

export default CategoryFilter