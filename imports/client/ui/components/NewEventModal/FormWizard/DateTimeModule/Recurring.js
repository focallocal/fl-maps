import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AutoField from '/imports/client/utils/uniforms-custom/AutoField'
import { CustomInput } from 'reactstrap'

class Recurring extends Component {
  state = {
    recurType: 'weekly'
  }

  render () {
    const {
      show
    } = this.props

    const CheckBox = this.CheckBox

    return (
      <div style={{ display: show ? 'block' : 'none' }}>
        <div className='inline-inputs'>
          <AutoField name='when.recurring.startingDate' />
          <AutoField name='when.recurring.endingDate' />
        </div>

        <div className='inline-checkboxes'>
          <CheckBox id='weekly' label='Weekly' />

          <CheckBox id='Monthly' label='Monthly' />

          <CheckBox id='Yearly' label='Yearly' />
        </div>
      </div>
    )
  }

  CheckBox = ({ label, id }) => (
    <CustomInput
      id={id}
      className='checkbox'
      type='checkbox'
      label={label}
      checked={this.state.recurType === id}
      onChange={() => this.handleCheckbox(id)}
    />
  )

  handleCheckbox = (id) => {
    const { form } = this.props

    form.change('when.recurring.type', id)
    this.setState({ recurType: id })
  }
}

Recurring.propTypes = {
  form: PropTypes.object.isRequired
}

export default Recurring
