function balances(prevValue = 0, action) {
  if (action.type === 'balances/initial') {
    return action.payload.value;
  }

  if (action.type === 'balances/deposit') {
    return prevValue + action.payload.value;
  }

  if (action.type === 'balances/withdraw') {
    const newBalances = prevValue - action.payload.value;
    if (newBalances < 0) return prevValue;
    return newBalances;
  }

  if (action.type === 'balances/purge') {
    return 0;
  }

  return prevValue;
}

export { balances };
