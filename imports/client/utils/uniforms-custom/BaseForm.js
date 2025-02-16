import React from 'react'
import { BaseForm as UniformsBaseForm } from 'uniforms'

const BaseForm = parent => class extends UniformsBaseForm {
    static displayName = 'BaseForm'
}

export default BaseForm