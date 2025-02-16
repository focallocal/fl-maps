import React from 'react';
import { QuickForm as UniformsQuickForm } from 'uniforms';
import BaseForm from './BaseForm';
import AutoField from './AutoField';
import ErrorsField from './ErrorsField';
import SubmitField from './SubmitField';

const Quick = parent => class extends UniformsQuickForm.Quick(parent) {
  static Quick = Quick;

  getAutoField() {
    return AutoField;
  }

  getErrorsField() {
    return ErrorsField;
  }

  getSubmitField() {
    return SubmitField;
  }
};

export default Quick(BaseForm);