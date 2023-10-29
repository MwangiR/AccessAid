export const clientReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_CLIENT': {
      const newClient = { ...action.payload };
      return {
        ...state,
        clients: [...state.clients, newClient],
      };
    }
    default: {
      return state;
    }
  }
};
