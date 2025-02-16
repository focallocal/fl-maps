import React from 'react';
import { QuickForm } from 'uniforms';

class ValidatedQuickForm extends QuickForm {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
}

export default ValidatedQuickForm;