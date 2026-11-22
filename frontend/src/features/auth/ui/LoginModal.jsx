import { useState } from 'react'
import { useLoginMutation } from '@/shared/api/user'
import styles from './LoginModal.module.scss'
import TextContainer from '@/shared/ui/TextContainer'
import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'

const LoginModal = ({ onClose, onRegister }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isClosing, setIsClosing] = useState(false)

    const [loginUser, { isLoading, error }] = useLoginMutation()

    const handleClose = () => {
        setIsClosing(true)
    }

    const handleAnimationEnd = () => {
        if (isClosing) {
            onClose()
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const data = await loginUser({
                email,
                password
            }).unwrap()

            onClose()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={`${styles.overlay} ${isClosing ? styles.closing : ''}`} onClick={handleClose} onAnimationEnd={handleAnimationEnd}>
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

                <TextContainer text='Вхід в аккаунт' className='login-title'/>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input
                        className="login"
                        type="text" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        className="login"
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && (
                        <TextContainer className='login-error' text='Неправильний email або пароль'/>
                    )}
                    
                    <Button
                        type="submit"
                        disabled={isLoading}
                        text='Увійти'
                    >
                        {isLoading ? 'Вхід...' : 'Увійти'}
                    </Button>
                </form>
                
                <TextContainer
                    text='Немає аккаунту? Зареєструватись'
                    className='register-link'
                    onClick={onRegister}
                />
            </div>
        </div>
    )
}

export default LoginModal