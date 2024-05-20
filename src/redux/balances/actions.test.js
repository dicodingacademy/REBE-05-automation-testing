import { configureStore } from '@reduxjs/toolkit';
import { describe } from 'vitest';
import { balances } from './reducer.js';
import {
  asyncDeposit, asyncPurge, asyncRestore, asyncWithdraw,
} from './actions.js';
import { balancesAPI } from '../../utils/api.js';

vi.mock('../../utils/api.js');

describe('balances actions', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { balances },
    });

    vi.resetAllMocks();
  });

  describe('asyncDeposit action', () => {
    it('should update state correctly when dispatching asyncDeposit action', async () => {
      // Arrange
      balancesAPI.deposit.mockImplementation(() => Promise.resolve());

      // Action
      await store.dispatch(asyncDeposit(1_000));

      // Assert
      const state = store.getState();
      expect(state.balances).toEqual(1_000);
    });

    it('should restore state correctly when dispatching asyncDeposit action but API is failed', async () => {
      // Arrange
      balancesAPI.deposit.mockImplementation(() => Promise.reject(new Error('ups, error!')));

      // Action
      await store.dispatch(asyncDeposit(1_000));

      // Assert
      const state = store.getState();
      expect(state.balances).toEqual(0);
    });
  });

  describe('asyncWithdraw action', () => {
    it('should update state correctly when dispatching asyncWithdraw action', async () => {
      // Arrange
      await store.dispatch(asyncDeposit(50_000));
      balancesAPI.withdraw.mockImplementation(() => Promise.resolve());

      // Action
      await store.dispatch(asyncWithdraw(10_000));

      // Assert
      const state = store.getState();
      expect(state.balances).toEqual(40_000);
    });

    it('should restore state correctly when dispatching asyncWithdraw action but API is failed', async () => {
      // Arrange
      balancesAPI.withdraw.mockImplementation(() => Promise.reject(new Error('ups, error!')));
      await store.dispatch(asyncDeposit(50_000));

      // Action
      await store.dispatch(asyncWithdraw(10_000));

      // Assert
      const state = store.getState();
      expect(state.balances).toEqual(50_000);
    });
  });

  describe('asyncPurge action', () => {
    it('should update state correctly when dispatching asyncPurge action', async () => {
      // Arrange
      balancesAPI.purge.mockImplementation(() => Promise.resolve());
      await store.dispatch(asyncDeposit(10_000));

      // Action
      await store.dispatch(asyncPurge());

      // Assert
      const state = store.getState();
      expect(state.balances).toEqual(0);
    });

    it('should restore state correctly when dispatching asyncPurge action but API is failed', async () => {
      // Arrange
      balancesAPI.purge.mockImplementation(() => Promise.reject(new Error('ups, error!')));
      await store.dispatch(asyncDeposit(50_000));

      // Action
      await store.dispatch(asyncPurge());

      // Assert
      const state = store.getState();
      expect(state.balances).toEqual(50_000);
    });
  });

  describe('asyncRestore action', () => {
    it('should update state correctly when dispatching asyncRestore action', async () => {
      // Arrange
      balancesAPI.getBalances.mockImplementation(() => Promise.resolve(50_000));

      // Action
      await store.dispatch(asyncRestore());

      // Assert
      const state = store.getState();
      expect(state.balances).toEqual(50_000);
    });
  });
});
