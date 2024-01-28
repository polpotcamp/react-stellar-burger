
import OrderHistory from "../components/OrderHistory/OrderHistory"
import { useDispatch } from "react-redux"
import { getWsConnectionStartAction } from "../services/actions/WS"
import { wsUrl } from "../utils/WS"
import React from "react"
function OrderHistoryPage() {
        const dispatch = useDispatch()
        const tokenWithBaarer = localStorage.getItem("accessToken") as string
        const tokenWithBadSymbol = tokenWithBaarer.substring(8);
        const token = tokenWithBadSymbol.substring(0, tokenWithBadSymbol.length - 1);
        React.useEffect(() => {
                dispatch(getWsConnectionStartAction(`${wsUrl}?token=${token}`))
                return () => {
                        dispatch({ type: 'socket/disconnect' })
                }
        }, [])
        return <OrderHistory />
}
export default OrderHistoryPage