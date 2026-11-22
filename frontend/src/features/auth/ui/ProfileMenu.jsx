import TextContainer from '@/shared/ui/TextContainer'
import styles from './ProfileMenu.module.scss'

const ProfileMenu = ({ user, onLogout }) => {
    return (
        <div className={styles['profile-menu']}>
            <TextContainer className='profile-name' text={`Привіт, ${user.first_name} ${user.last_name}!`}/>
            <TextContainer className='profile-email' text={user.email}/>
            <hr />
            <TextContainer className='profile-button' text={'Вийти з акаунту'} onClick={onLogout}/>
        </div>
    )
}

export default ProfileMenu