import { createSlice } from '@reduxjs/toolkit';

const initialState = 0;

const balancesSlice = createSlice({
  name: 'balances',
  initialState,
  reducers: {
    restore: (state, action) => action.payload,
    deposit: (state, action) => state + action.payload,
    withdraw: (state, action) => {
      const newBalance = state - action.payload;
      return newBalance < 0 ? state : newBalance;
    },
    purge: () => 0,
  },
});

const balances = balancesSlice.reducer;
const {
  restore,
  deposit,
  withdraw,
  purge,
} = balancesSlice.actions;

export {
  balances, restore, deposit, withdraw, purge,
};
