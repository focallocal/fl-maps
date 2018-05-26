import React, {Component } from 'react'
import connectField        from 'uniforms/connectField'
import DayPicker           from 'react-day-picker/DayPicker'
import { FormGroup, Label, Input, Modal } from 'reactstrap'

class Date_ extends Component {

  state = {
    showDayPicker: false
  }

  render () {
    const {
      id,
      label,
      onChange,
      value,
      error,
      placeholder
    } = this.props

    const {
      showDayPicker
    } = this.state

    return (
      <FormGroup className='date-field'>
        <Label>{label}</Label>
        <Input
          id={id}
          value={formatDate(value)}
          onFocus={e => this.toggleDayPicker(e, true)}
          invalid={Boolean(error)}
          onChange={() => {}}
        />
        <Modal isOpen={showDayPicker} toggle={this.toggleDayPicker} className='day-picker-modal'>
          <DayPicker
            value={value}
            onDayClick={this.handleChange}
            placeholder={`${formatDate(new Date())}`}
          />
        </Modal>
      </FormGroup>
    )
  }

  handleChange = (date) => {
    this.toggleDayPicker()
    this.props.onChange(date)
  }

  toggleDayPicker = () => {
    this.setState(prevState => ({ showDayPicker: !prevState.showDayPicker}))
  }
}

const formatDate = date => {
  return date ? date.toISOString().substring(0, 10).split('-').join('/') : ''
}

export default connectField(Date_)
