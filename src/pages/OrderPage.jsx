import Order from "../components/Order/Order";
import React from "react"
import { useDispatch } from "react-redux"
import { wsConnectionStartAction } from "../services/actions/actions"
function OrderPage() {
        const dispatch = useDispatch()
        dispatch(wsConnectionStartAction())
        React.useEffect(() => {
                return (
                        dispatch({ type: 'socket/disconnect' })
                )
        }, [])
        return (
                <Order />
        )
}
export default OrderPage