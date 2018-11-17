import React, { Component } from 'react'
import connectField from 'uniforms/connectField'
import DayPicker from 'react-day-picker/DayPicker'
import { FormGroup, Label, Input, Modal } from "reactstrap";

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, 0);
const toMonth = new Date(currentYear + 10, 11);

function YearMonthForm({ date, localeUtils, onChange }) {
  const months = localeUtils.getMonths();

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <form className="DayPicker-Caption">
      <select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  );
}

function YearMonthForm ({ date, localeUtils, onChange }) {
  const months = localeUtils.getMonths()

  const years = []
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i)
  }

  const handleChange = function handleChange (e) {
    const { year, month } = e.target.form
    console.log('Handle Change', [year.value, month.value])
    onChange(new Date(year.value, month.value))
  }

  return (
    <form className="DayPicker-Caption">
      <select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  )
}

const currentYear = new Date().getFullYear()
const fromMonth = new Date(currentYear, 0)
const toMonth = new Date(currentYear + 10, 11)

function YearMonthForm ({ date, localeUtils, onChange }) {
  const months = localeUtils.getMonths()

  const years = []
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i)
  }

  const handleChange = function handleChange (e) {
    const { year, month } = e.target.form
    console.log('Handle Change', [year.value, month.value])
    onChange(new Date(year.value, month.value))
  }

  return (
    <form className="DayPicker-Caption">
      <select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  )
}

class Date_ extends Component {
  constructor(props) {
    super(props);

    this.handleYearMonthChange = this.handleYearMonthChange.bind(this);
    this.toggleDayPicker = this.toggleDayPicker.bind(this);
    this.state = {
      showDayPicker: false,
      month: new Date(currentYear, new Date().getMonth())
    };
  }

  handleYearMonthChange(month) {
    this.setState({ month });
  }

  render() {
    const { id, label, onChange, value, error, placeholder } = this.props;
    const { showDayPicker } = this.state;

    return (
      <FormGroup className="date-field">
        <Label>{label}</Label>
        <Input
          id={id}
          value={formatDate(value)}
          onFocus={e => this.toggleDayPicker(e, true)}
          invalid={Boolean(error)}
          onChange={onChange} // <------Input isn't being changed.
        />
        <Modal
          isOpen={showDayPicker}
          toggle={this.toggleDayPicker}
          className="day-picker-modal"
        >
          <DayPicker
            month={this.state.month}
            onDayClick={this.handleChange}
            fromMonth={fromMonth}
            toMonth={toMonth}
            captionElement={({ date, localeUtils }) => (
              <YearMonthForm
                date={date}
                localeUtils={localeUtils}
                onChange={this.handleYearMonthChange}
              />
            )}
          />
          <div className="date-clear" onClick={this.clearDate}>
            Clear
          </div>
        </Modal>
      </FormGroup>
    );
  }

  handleChange = (date = null) => {
    this.toggleDayPicker();
    this.props.onChange(date);
  };

  clearDate = () => {
    this.toggleDayPicker();
    this.props.onChange(null);
  };

  toggleDayPicker = () => {
    this.setState(prevState => ({ showDayPicker: !prevState.showDayPicker }));
  };
}

const formatDate = date => {
  try {
    return date
      .toISOString()
      .substring(0, 10)
      .split("-")
      .join("/");
  } catch (ex) {
    return "";
  }
};

export default connectField(Date_);
