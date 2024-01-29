

interface IsocketMiddlewareProps {
  wsInit: 'WS_CONNECTION_START',
  onOpen: "WS_CONNECTION_SUCCESS",
  onClose: "WS_CONNECTION_CLOSED",
  onError: "WS_CONNECTION_ERROR",
  onMessage: "WS_GET_MESSAGE",
}
export const socketMiddleware = (wsActions: IsocketMiddlewareProps) => {
  return (store: any) => {
    let socket: any = null;
    return (next: any) => (action: {type:string,payload:any}) => {
      console.log(action)
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(payload);
      }
      if (socket) {
        socket.onopen = (event: any) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event: any) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event: any) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        };
        socket.onclose = (event: any) => {
          
          dispatch({ type: onClose, payload: event });
        };
        switch (type) {
          case 'socket/disconnect':
            socket.close()
            break
          default:
            break
        }
      }
      next(action);
    };
  };
};