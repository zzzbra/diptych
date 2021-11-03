const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: {
          value: state.counter.value + 1,
        },
      };
    case 'DECREMENT':
      return {
        ...state,
        counter: {
          value: state.counter.value - 1,
        },
      };
    default:
      return state;
  }
};

export default counterReducer;
