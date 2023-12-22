
export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;
    let socket2 = null;
    return next => action => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage, onMessageUser, wsInitForUserOrders } = wsActions;
      const tokenWithBaarer = localStorage.getItem("accessToken")
      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}/all`);
      }
      if (type === wsInitForUserOrders) {
        if (tokenWithBaarer !== null) {
          const tokenWithBadSymbol = tokenWithBaarer.substring(8);
          const token = tokenWithBadSymbol.substring(0, tokenWithBadSymbol.length - 1);
          socket2 = new WebSocket(`${wsUrl}?token=${token}`);
        }
      }
      if (socket) {
        socket.onopen = event => {
          console.log('good1')
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

      }
      if (socket2) {
        socket2.onopen = event => {
          console.log('good2')
          dispatch({ type: onOpen, payload: event });
        };

        socket2.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket2.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessageUser, payload: restParsedData });
        };
        socket2.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
      }
      next(action);
    };
  };
};