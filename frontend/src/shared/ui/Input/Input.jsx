import styles from './Input.module.scss'

const Input = (props) => {
    const {
        placeholder,
        className,
        type,
        onChange,
        value
    } = props
    
    const handleChange = (e) => {
        const newValue = e.target.value

        if (type === 'number') {
            if (!/^\d*$/.test(newValue)) {
                return
            }
            if (Number(newValue) > 999) {
                return
            }
        }
        onChange(e)
    }


    return (
        <input 
            className={styles[className]}
            type={type === 'number' ? 'text' : type}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            inputMode={type === 'number' ? 'numeric' : undefined}
        />
    )
}

export default Input