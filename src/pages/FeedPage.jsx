import OrderFeed from "../components/OrderFeed/OrderFeed"
import React from "react"
import { useDispatch } from "react-redux"
import { wsConnectionStartAction } from "../services/actions/actions"
import { wsUrl } from "../utils/WS"
function FeedPage() {
       const dispatch = useDispatch()
       React.useEffect(() => {
              dispatch(wsConnectionStartAction(`${wsUrl}/all`))
              return () => {
                     dispatch({ type: 'socket/disconnect' })
              }
       }, [])
       return <OrderFeed />
}
export default FeedPage
