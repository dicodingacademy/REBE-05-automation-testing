import React from 'react';
import PropTypes from 'prop-types';

import { formatToRupiah } from '../utils/index.js';

function DecimalDisplay(props) {
  const { value } = props;

  return (
    <div className="decimal-display">
      <p>
        Current:
        <span className="decimal-display__value">{ formatToRupiah(value) }</span>
      </p>
    </div>
  );
}

DecimalDisplay.propTypes = {
  value: PropTypes.number.isRequired,
};

export default DecimalDisplay;
