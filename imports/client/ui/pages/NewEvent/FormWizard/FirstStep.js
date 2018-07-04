import React, { Component } from 'react'
import { CustomInput } from 'reactstrap'
import PropTypes from 'prop-types'
import AutoField from '/imports/client/utils/uniforms-custom/AutoField'

class FirstStep extends Component {
  constructor (props) {
    super(props)
    this.state = {
      categories: null,
      foundResource: true,
      offerResource: false,
      resourceType: 'found'}
  }
  render () {
    const {
      form
    } = this.props
    const {
      resourceType
    } = form.getModel().when

    const RadioButton = this.RadioButton
    return (
      <div id='first-step'>
        <RadioButton
          id='foundResource'
          label='I found a resource nearby'
          value={this.state.foundResource}
          type='radio'
          click={this.setCategories}
        />
        <RadioButton
          id='offerResource'
          label='I want to offer my own resource'
          value={this.state.offerResource}
          type='radio'
          click={this.noCategories}
        />
        <AutoField name='overview' />
        <AutoField name='name' />
        <AutoField name='address' />
        {this.state.resourceType === 'found' ? (
          <AutoField name='categories' />
        ) : null }
      </div>
    )
  }
  noCategories = (type, value) => {
    this.setState({resourceType: null, foundResource: false, offerResource: true})
  }

  setCategories = () => {
    this.setState({resourceType: 'found', foundResource: true, offerResource: false})
  }

  RadioButton = ({ label, id, value, type, click }) => (
    <CustomInput
      id={id}
      type={type}
      label={label}
      checked={value === undefined ? false : value}
      onChange={() => {}}
      onClick={() => this.handleRadioButton(id, !value, click)}
    />
  )
  handleRadioButton = (type, value, click) => {
    const { when } = this.props.form.getModel()
    this.props.form.change('when', {
      ...when,
      resourceType: type === 'foundResource' ? 'found' : null
    })
    click()
  }
}

FirstStep.propTypes = {
  form: PropTypes.object
}

export default FirstStep
