import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const { text, action } = props;
  return (
    <button className="button-action" type="button" onClick={action}>
      { text }
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default Button;
