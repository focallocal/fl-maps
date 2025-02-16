import React from 'react';
import * as Uniforms from 'uniforms';

class ValidatedQuickForm extends Uniforms.ValidatedQuickForm {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
}

export default ValidatedQuickForm;