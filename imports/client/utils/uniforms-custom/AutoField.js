import BaseField       from 'uniforms/BaseField';
import invariant       from 'fbjs/lib/invariant';
import {createElement} from 'react';

import BoolField     from 'uniforms-unstyled/BoolField';
import DateField     from './DateField';
import ListField     from 'uniforms-unstyled/ListField';
import NestField     from 'uniforms-unstyled/NestField';
import InputField    from './InputField';
import RadioField    from 'uniforms-unstyled/RadioField'
import SelectField   from './SelectField'

export default class AutoField extends BaseField {
    static displayName = 'AutoField';

    getChildContextName () {
        return this.context.uniforms.name;
    }

    render () {
        const props = this.getFieldProps(undefined, {ensureValue: false});
        const { customType, fieldType } = props

        if (customType) {
          switch (customType) {
            case 'select':   props.component = SelectField; break;
            case 'textarea': props.component = InputField;  break;
            case 'number':   props.component = InputField;  break;
          }
        } else {
          switch (fieldType) {
              case Date:    props.component = DateField;  break;
              case Array:   props.component = ListField;  break;
              case Object:  props.component = NestField;  break;
              case String:  props.component = InputField; break;
              case Boolean: props.component = BoolField;  break;
          }

          invariant(props.component, 'Unsupported field type: %s', props.fieldType.toString());
        }

        return createElement(props.component, this.props);
    }
}
