import { AutoForm } from 'uniforms'
import ValidatedQuickForm from './ValidatedQuickForm'
// import BaseForm from 'uniforms/BaseForm' removed as AI said it wasn't used anywhere in project


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