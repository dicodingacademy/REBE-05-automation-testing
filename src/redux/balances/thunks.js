import { createAsyncThunk } from '@reduxjs/toolkit';
import { balancesAPI } from '../../utils/api.js';
import {
  deposit, purge, restore, withdraw,
} from './slices.js';

export const asyncRestore = createAsyncThunk(
  'balances/asyncRestore',
  async (_, { dispatch }) => {
    const balances = await balancesAPI.getBalances();
    dispatch(restore(balances));
  },
);

export const asyncDeposit = createAsyncThunk(
  'balances/asyncDeposit',
  async (value, { dispatch, getState }) => {
    const { balances } = getState();

    try {
      dispatch(deposit(value));
      await balancesAPI.deposit(value);
    } catch {
      dispatch(restore(balances));
    }
  },
);

export const asyncWithdraw = createAsyncThunk(
  'balances/asyncWithdraw',
  async (value, { dispatch, getState }) => {
    const { balances } = getState();
    try {
      dispatch(withdraw(value));
      await balancesAPI.withdraw(value);
    } catch {
      dispatch(restore(balances));
    }
  },
);

export const asyncPurge = createAsyncThunk(
  'balances/asyncPurge',
  async (_, { dispatch, getState }) => {
    const { balances } = getState();
    try {
      dispatch(purge());
      await balancesAPI.purge();
    } catch {
      dispatch(restore(balances));
    }
  },
);
