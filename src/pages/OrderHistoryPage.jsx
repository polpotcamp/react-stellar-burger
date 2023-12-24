
import OrderHistory from "../components/OrderHistory/OrderHistory"
import { useDispatch } from "react-redux"
import { wsConnectionStartAction } from "../services/actions/actions"
import { wsUrl } from "../utils/WS"
import React from "react"
function OrderHistoryPage() {
        const dispatch = useDispatch()
        const tokenWithBaarer = localStorage.getItem("accessToken")
        const tokenWithBadSymbol = tokenWithBaarer.substring(8);
        const token = tokenWithBadSymbol.substring(0, tokenWithBadSymbol.length - 1);
        React.useEffect(() => {
                dispatch(wsConnectionStartAction(`${wsUrl}?token=${token}`))
                return () => {
                        dispatch({ type: 'socket/disconnect' })
                }
        }, [])
        return <OrderHistory />
}
export default OrderHistoryPage