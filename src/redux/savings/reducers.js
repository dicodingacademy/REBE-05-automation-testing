function savings(prevValue = 0, action) {
  if (action.type === 'savings/deposit') {
    return prevValue + action.payload.value;
  }

  return prevValue;
}

export { savings };
