import React from 'react';
import PropTypes from 'prop-types';

function DecimalInput(props) {
  const { value, valueChange } = props;

  return (
    <div className="decimal-input">
      <input
        value={value}
        onChange={valueChange}
        type="number"
        min={0}
      />
    </div>
  );
}

DecimalInput.propTypes = {
  value: PropTypes.number.isRequired,
  valueChange: PropTypes.func.isRequired,
};

export default DecimalInput;
