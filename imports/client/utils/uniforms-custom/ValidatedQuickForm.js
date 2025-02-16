import React from 'react';
import { ValidatedQuickForm } from 'uniforms';

class CustomValidatedQuickForm extends ValidatedQuickForm {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
}

export default CustomValidatedQuickForm;