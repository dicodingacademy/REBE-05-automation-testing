import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navigation">
      <ul>
        <li><Link to="/balances">My Balances</Link></li>
        <li><Link to="/savings">My Savings</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
