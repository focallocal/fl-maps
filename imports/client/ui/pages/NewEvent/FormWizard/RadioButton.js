import PropTypes from 'prop-types';
import React from 'react';
import { Input, Label } from 'reactstrap';

const RadioButton = ({ label, id, value, type, click, onRadioButtonClick }) => {
  return (
    <div className="radio-button-wrapper d-flex">
      <Input
        id={id}
        type={type}
        checked={value || false}
        onChange={() => onRadioButtonClick(id, !value, click)}
      />
      <Label for={id} className="ms-2">{label}</Label>
    </div>
  );
};

RadioButton.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.bool,
  type: PropTypes.string.isRequired,
  click: PropTypes.func,
  onRadioButtonClick: PropTypes.func.isRequired,
  form: PropTypes.object
};

export default RadioButton;
