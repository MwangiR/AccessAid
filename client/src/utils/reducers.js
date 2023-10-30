export const clientReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_CLIENT': {
      const newClient = { ...action.payload };
      return {
        ...state,
        clients: [...state.clients, newClient],
      };
    }
    case 'REGISTER_EVENT': {
      const newEvent = { ...action.payload };
      return {
        ...state,
        events: [...state.events, newEvent],
      };
    }
    case 'DELETE_EVENT': {
      const eventId = action.payload;
      const updatedEvents = state.events.filter((event) => event._id !== eventId);
      return {
        ...state,
        events: updatedEvents,
      };
    }

    default: {
      return state;
    }
  }
};
