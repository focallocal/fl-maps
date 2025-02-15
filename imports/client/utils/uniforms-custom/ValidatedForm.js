import React from 'react';
import { ValidatedForm as UniformsValidatedForm } from 'uniforms';

import BaseForm from './BaseForm'

const Validated = parent => class extends UniformsValidatedForm.Validated(parent) {
    static Validated = Validated;
}

const ValidatedForm = (props) => {
  return <UniformsValidatedForm {...props} />;
};

export default Validated(BaseForm)