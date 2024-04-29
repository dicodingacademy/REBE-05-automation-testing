function deposit(value) {
  return {
    type: 'savings/deposit',
    payload: {
      value,
    },
  };
}

export { deposit };
