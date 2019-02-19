import AutoForm from 'uniforms/AutoForm'

import ValidatedQuickForm from './ValidatedQuickForm'

const Auto = parent => class extends AutoForm.Auto(parent) {
    static Auto = Auto;
    onChange (key, value) {
      // starting date should not be later than ending date
      if (key === 'when.endingDate' && value < this.getModel().when.startingDate) {
        super.onChange('when.startingDate', value)
      } else if (key === 'when.startingDate' && value > this.getModel().when.endingDate) {
        super.onChange('when.endingDate', value)
      }
      // pass on all changes to super
      super.onChange(key, value)
    }
}

export default Auto(ValidatedQuickForm)
