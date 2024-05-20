import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { userEvent } from '@testing-library/user-event';
import { balances } from '../redux/balances/reducer.js';
import { balancesAPI } from '../utils/api.js';
import BalancesPage from './BalancesPage.jsx';

vi.mock('../utils/api.js');

describe('<BalancesPage /> component', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { balances },
    });

    vi.resetAllMocks();
  });

  async function renderPageWithBalances(_balances) {
    balancesAPI.getBalances.mockImplementation(() => Promise.resolve(_balances));

    await act(() => render(
      <Provider store={store}>
        <BalancesPage />
      </Provider>,
    ));
  }

  it('should render balances correctly', async () => {
    // Action
    await renderPageWithBalances(10_000);

    // Assert
    const element = await screen.getByText('Rp 10.000,00', { exact: true });
    expect(element).toBeDefined();
  });

  it('should deposit balances correctly', async () => {
    // Arrange
    await renderPageWithBalances(25_000);

    const inputElement = await screen.getByDisplayValue('0', { exact: true });
    const buttonElement = await screen.getByText('Deposit', { exact: true });

    // Action
    await userEvent.type(inputElement, '20000');
    await userEvent.click(buttonElement);

    // Assert
    const element = await screen.getByText('Rp 45.000,00', { exact: true });
    expect(element).toBeDefined();
  });

  it('should withdraw balances correctly', async () => {
    // Arrange
    await renderPageWithBalances(50_000);

    const inputElement = await screen.getByDisplayValue('0', { exact: true });
    const buttonElement = await screen.getByText('Withdraw', { exact: true });

    // Action
    await userEvent.type(inputElement, '20000');
    await userEvent.click(buttonElement);

    // Assert
    const element = await screen.getByText('Rp 30.000,00', { exact: true });
    expect(element).toBeDefined();
  });

  it('should purge balances correctly', async () => {
    // Arrange
    await renderPageWithBalances(50_000);
    const buttonElement = await screen.getByText('Purge', { exact: true });

    // Action
    await userEvent.click(buttonElement);

    const element = await screen.getByText('Rp 0,00', { exact: true });
    expect(element).toBeDefined();
  });
});
