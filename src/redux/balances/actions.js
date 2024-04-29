import { balancesAPI } from '../../utils/api.js';

function deposit(value) {
  return {
    type: 'balances/deposit',
    payload: {
      value,
    },
  };
}

function withdraw(value) {
  return {
    type: 'balances/withdraw',
    payload: {
      value,
    },
  };
}

function purge() {
  return {
    type: 'balances/purge',
  };
}

function restore(value) {
  return {
    type: 'balances/restore',
    payload: {
      value,
    },
  };
}

function asyncRestore() {
  return async (dispatch) => {
    const balances = await balancesAPI.getBalances();
    dispatch(restore(balances));
  };
}

function asyncDeposit(value) {
  return async (dispatch, getState) => {
    const { balances } = getState();
    try {
      dispatch(deposit(value));
      await balancesAPI.deposit(value);
    } catch {
      dispatch(restore(balances));
    }
  };
}

function asyncWithdraw(value) {
  return async (dispatch, getState) => {
    const { balances } = getState();
    try {
      dispatch(withdraw(value));
      await balancesAPI.withdraw(value);
    } catch {
      dispatch(restore(balances));
    }
  };
}

function asyncPurge() {
  return async (dispatch, getState) => {
    const { balances } = getState();

    try {
      dispatch(purge());
      await balancesAPI.purge();
    } catch {
      dispatch(restore(balances));
    }
  };
}

export {
  asyncDeposit, asyncWithdraw, asyncPurge, asyncRestore,
};
