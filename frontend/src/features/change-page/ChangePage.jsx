import { useSelector } from 'react-redux'
import styles from './ChangePage.module.scss'
import TextContainer from '@/shared/ui/TextContainer'
import IconSvg from '@/shared/ui/IconSvg'
import { useActions } from '@/shared/hooks/useActions'
import { useGetProductsQuery } from '@/shared/api/products'

const ChangePage = () => {
    const categoryId = useSelector(state => state.products.categoryId)
    const page = useSelector(state => state.products.page)

    const { setPage } = useActions()

    const { currentData, isFetching } = useGetProductsQuery({
        categoryId,
        limit: 16,
        offset: page * 16 - 16,
    })

    const totalPages = Math.ceil(
        (currentData?.total ?? 0) / 16
    )

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const handleNextPage = () => {
        if (!isFetching && page < totalPages) {
            setPage(page + 1)
        }
    }

    return (
        <>
        {totalPages > 1 &&
            <div className={styles['container']}>
                <IconSvg className='page' onClick={handlePrevPage}>
                    <svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"></path>
                    </svg>
                </IconSvg>

                <TextContainer text={page} className='page'/>

                <IconSvg className='page' onClick={handleNextPage}>
                    <svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path>
                    </svg>
                </IconSvg>
            </div>
        }
        </>
    )
}

export default ChangePage