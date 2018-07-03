import React, { Component } from 'react'
import { CustomInput, Row, Col } from 'reactstrap'
import PropTypes from 'prop-types'
import AutoField from '/imports/client/utils/uniforms-custom/AutoField'

class FirstStep extends Component {
  constructor (props) {
    super(props)
    this.state = {
      categories: null}
  }
  render () {
    const {
      form
    } = this.props
    const {
      foundResource,
      offerResource
    } = form.getModel().when

    const RadioButton = this.RadioButton
    return (
      <div id='first-step'>
        <Row>
          <Col>
            <RadioButton
              id='foundResource'
              label='I found a resource nearby'
              value={foundResource}
              type='radio'
              click={this.setCategories}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <RadioButton
              id='offerResource'
              label='I want to offer my own resource'
              value={offerResource}
              type='radio'
              click={this.noCategories}
            />
          </Col>
        </Row>
        <AutoField name='overview' />
        <AutoField name='name' />
        <AutoField name='address' />
        {this.state.categories}
      </div>
    )
  }
  noCategories = (type, value) => {
    const initComm = [
      {'name': 'Community Resource', 'color': '#f82d2d'}
    ]
    const divStyle = {
      display: 'none'
    }
    // Sets the category to "Community Resource and then hides Category selection"
    this.setState({categories: <div style={divStyle}><AutoField name='categories' value={initComm} /></div>})
  }

  setCategories = () => {
    // Sets the category value to an empty object and allows for selection of new categories.
    // ISSUE : Community Resource still shows if offerResource previously selected, no categories should show
    this.setState({categories: <AutoField name='categories' value={[]}/>})
    this.setState({categories: <AutoField name='categories'/>})
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
    console.log('called')
    this.props.form.change('when', {
      ...when,
      foundResource: type === 'foundResource' ? value : false,
      offerResource: type === 'offerResource' ? value : false
    })
    click()
  }
}

FirstStep.propTypes = {
  form: PropTypes.object
}

export default FirstStep
