
import getUserData from "../services/async/GetUserData"
import { useDispatch } from "react-redux"
import OrderHistory from "../components/OrderHistory/OrderHistory"
function OrderHistoryPage() {
       const dispatch = useDispatch()
       dispatch(getUserData())
        return <OrderHistory/>
}
export default OrderHistoryPage