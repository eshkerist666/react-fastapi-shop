import { useState } from 'react'
import { useLoginMutation, useRegisterMutation } from '@/shared/api/user'
import styles from './RegisterModal.module.scss'
import TextContainer from '@/shared/ui/TextContainer'
import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'

const RegisterModal = ({ onClose, onLogin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    
    const [isClosing, setIsClosing] = useState(false)

    const [registerUser, { isLoading, error }] = useRegisterMutation()
    const [loginUser, { isLoading: isLoginLoading, loginError }] = useLoginMutation()

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
            const data = await registerUser({
                email,
                firstName,
                lastName,
                password
            }).unwrap()
            
            await loginUser({
                email,
                password,
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

                <TextContainer text='Зареєструватись' className='login-title'/>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input
                        className="login"
                        type="text" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    
                    <div className={styles['name-container']}>
                        <Input
                            className="login-name"
                            type="text" 
                            placeholder="Ім’я" 
                            value={firstName} 
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <Input
                            className="login-name"
                            type="text" 
                            placeholder="Прізвище" 
                            value={lastName} 
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    
                    <Input
                        className="login"
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && (
                        <TextContainer className='login-error' text='Не вдалось зареєеструватись'/>
                    )}
                    
                    <Button
                        type="submit"
                        disabled={isLoading}
                        text='Далі'
                    >
                        {isLoading ? 'Реєстрація...' : 'Далі'}
                    </Button>
                </form>
                
                <TextContainer
                    text='Вже є аккаунт? Увійти'
                    className='register-link'
                    onClick={onLogin}
                />
            </div>
        </div>
    )
}

export default RegisterModal