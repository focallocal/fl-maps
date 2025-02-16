import React from 'react';
import { ValidatedQuickForm } from 'uniforms-bootstrap5';

// Keep it simple - just extend directly
class CustomValidatedQuickForm extends ValidatedQuickForm {
  constructor(props) {
    super(props);
  }
}

export default CustomValidatedQuickForm;