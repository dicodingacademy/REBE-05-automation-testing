import { configureStore } from '@reduxjs/toolkit';

import { balances } from './balances/slices.js';
import { savings } from './savings/reducers.js';

const store = configureStore({
  reducer: {
    balances,
    savings,
  },
});

export default store;
