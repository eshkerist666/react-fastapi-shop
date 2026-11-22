import { useActions } from "@/shared/hooks/useActions"
import Button from "@/shared/ui/Button"
import Input from "@/shared/ui/Input"
import { useState } from "react"

const SearchItemForm = (props) => {
    const { styles } = props
        
    const [value, setValue] = useState('')
    const { setSearchQuery } = useActions()

    const handleSubmit = (event) => {
        event.preventDefault()
        setSearchQuery(value.trim())
    }

    return (
        <form 
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <Input className='search' type='text' placeholder='Пошук' value={value} onChange={(event) => setValue(event.target.value)}/>
            <Button text='Знайти' style={{ marginLeft: "-15px" }}/>
        </form>
    )
}

export default SearchItemForm
