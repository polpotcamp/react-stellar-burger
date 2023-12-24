
export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null;
    let socket2 = null;
    return next => action => {
      const { dispatch } = store;
      const { type,payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage} = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(payload);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        };
        socket.onclose = event => {
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
