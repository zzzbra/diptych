const reducer = (state, action) => {
  switch (action.type) {
    case '':
      console.log('reducing');
      break;
    default:
      console.log('default reducing');
  }
};

export default reducer;
