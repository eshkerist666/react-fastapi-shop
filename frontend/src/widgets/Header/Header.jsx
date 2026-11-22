import SearchItemForm from '@/features/search-item'
import IconButton from '@/shared/ui/IconButton'
import { NavLink, useNavigate } from "react-router"
import styles from './Header.module.scss'
import { useState } from 'react'
import { selectGetMeResult, useLogoutMutation } from '@/shared/api/user'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '@/shared/api/api'
import ProfileMenu from '@/features/auth/ui/ProfileMenu'
import { useActions } from '@/shared/hooks/useActions'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isProfileOpen, setIsProfileOpen] = useState(false); 
    const { data: user, isLoading, error } = useSelector(selectGetMeResult)
    const [logoutUser] = useLogoutMutation()
    const { openAuthModal } = useActions()

    const handleOrderClick = () => {
        if (isLoading) {
            return
        }
        if (!user || error) {
            openAuthModal('login')
            return
        }
        navigate('/orders')
    }

    const handleCartClick = () => {
    if (isLoading) {
        return
    }
    if (!user || error) {
        openAuthModal('login')
        return
    }
    navigate('/cart')
}

    const handleProfileClick = () => {
        if (!user) {
            openAuthModal('login')
            return
        } 
        setIsProfileOpen(prev => !prev)

    }
    const handleLogout = async () => {
        try {
            await logoutUser().unwrap()

            dispatch(
                api.util.updateQueryData(
                    'getMe',
                    undefined,
                    () => null
                )
            )
            setModal(null)
            
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <header className={styles.header}>
            <div className={styles.body}>
                <NavLink className={styles.link} to={`/`} end>
                    <span className={styles.title}>SHOP</span>
                </NavLink>
                <SearchItemForm styles={styles}/>
                <div className={styles['icons-container']}>
                    <IconButton 
                        style={{ marginRight: '15px'}}
                        link='https://img.icons8.com/?size=100&id=cUGFxfE5Snpo&format=png&color=000000'
                        onClick={handleOrderClick}
                    />
                    <div>
                        <IconButton 
                            style={{ marginRight: '15px'}}
                            link='https://cdn-icons-png.flaticon.com/512/263/263142.png'
                            onClick={handleCartClick}
                        />
                    </div>
                    <div className={styles['profile-container']}>
                        <IconButton
                            link='https://img.icons8.com/?size=100&id=WNS8XGkd1Rhp&format=png&color=000000'
                            onClick={handleProfileClick}
                        />
                        {user && isProfileOpen && (
                            <ProfileMenu user={user} onLogout={handleLogout}/>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header