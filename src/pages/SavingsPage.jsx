import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput.js';
import DecimalDisplay from '../components/DecimalDisplay.jsx';
import DecimalInput from '../components/DecimalInput.jsx';
import Button from '../components/Button.jsx';
import { deposit } from '../redux/savings/actions.js';

function SavingsPage() {
  const [inputValue, onInputValueChange] = useInput(0);
  const savings = useSelector((state) => state.savings);

  const dispatch = useDispatch();

  const onDeposit = () => {
    dispatch(deposit(inputValue));
  };

  return (
    <div className="balances-page">
      <h1>Your Savings</h1>
      <DecimalDisplay value={savings} />
      <DecimalInput value={inputValue} valueChange={onInputValueChange} />

      <div className="actions">
        <Button text="Deposit" action={onDeposit} />
      </div>
    </div>
  );
}

export default SavingsPage;
