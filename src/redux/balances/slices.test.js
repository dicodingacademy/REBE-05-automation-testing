import {
  balances, deposit, purge, restore, withdraw,
} from './slices.js';

describe('balances reducer', () => {
  it('should return correct balances when given by balances/restore action', () => {
    // Arrange
    const prevValue = 100;
    const action = restore(10_000);

    // Action
    const result = balances(prevValue, action);

    // Assert
    expect(result).toEqual(10_000);
  });

  it('should return correct balances when given by balances/deposit action', () => {
    // Arrange
    const prevValue = 500;
    const action = deposit(20_000);

    // Action
    const result = balances(prevValue, action);

    // Assert
    expect(result).toEqual(20_500);
  });

  it('should return correct balances when given by balances/withdraw action', () => {
    // Arrange
    const prevValue = 50_000;
    const action = withdraw(20_000);

    // Action
    const result = balances(prevValue, action);

    // Assert
    expect(result).toEqual(30_000);
  });

  it('should return prev balances when given by balances/withdraw action but payload more than prevValue', () => {
    // Arrange
    const prevValue = 1_000;
    const action = withdraw(20_000);

    // Action
    const result = balances(prevValue, action);

    // Assert
    expect(result).toEqual(1_000);
  });

  it('should return correct balances when given by balances/purge action', () => {
    // Arrange
    const prevValue = 50_000;
    const action = purge();

    // Action
    const result = balances(prevValue, action);

    // Assert
    expect(result).toEqual(0);
  });
});
