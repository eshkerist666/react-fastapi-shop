import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { actions as authActions} from "../store/auth/authModal.slice"
import { actions as productsActions } from "../store/products/products.slice"
import { useMemo } from "react"

const rootActions = {
    ...authActions,
    ...productsActions,
}

export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}