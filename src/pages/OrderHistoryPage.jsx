
import OrderHistory from "../components/OrderHistory/OrderHistory"
import { useDispatch } from "react-redux"
import { wsConnectionStartUserOrdersAction} from "../services/actions/actions"
import React from "react"
function OrderHistoryPage() {
        const dispatch = useDispatch()
        dispatch(wsConnectionStartUserOrdersAction())
        React.useEffect(() => {
                return(
                        dispatch({ type: 'socket/disconnect' })
                )
                }, [])
        return <OrderHistory />
}
export default OrderHistoryPage