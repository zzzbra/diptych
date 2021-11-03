export const incrementCounter = () => {
  return (dispatch) => {
    dispatch({
      type: 'INCREMENT',
    });
  };
};

export const decrementCounter = () => {
  return (dispatch) => {
    dispatch({
      type: 'DECREMENT',
    });
  };
};

export const increaseBy = (quantity) => {
  return (dispatch) => {
    dispatch({
      type: 'DECREMENT',
      payload: quantity,
    });
  };
};
