import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import './styles.scss'

class SearchButtons extends Component {
  render () {
    return (
      <div className='buttons'>
        <Button onClick={this.props.toggleFilters}>
          <i className='fa fa-filter' />
          Filter
        </Button>
        <Button
          className={this.props.showNextView ? 'next-btn active' : 'next-btn'}
          onClick={this.props.toggleNextView}
        >
          <i className='fa fa-clock' />
          Next
        </Button>
        {this.props.showNextView && (
          <Button
            className='print-btn'
            onClick={this.props.handlePrint}
            title='Print Calendar'
          >
            <i className='fa fa-print' />
            Print
          </Button>
        )}
        <Button
          onClick={this.props.togglePastEvents}
        >
          {this.props.showPastEvents ? 'Hide Past' : 'Show Past'}
        </Button>
        {/* <Button>
          <i className='fas fa-cog' />
          Options
        </Button> */}
      </div>
    )
  }
}

SearchButtons.propTypes = {
  toggleFilters: PropTypes.func.isRequired,
  toggleNextView: PropTypes.func.isRequired,
  showNextView: PropTypes.bool,
  handlePrint: PropTypes.func,
  togglePastEvents: PropTypes.func,
  showPastEvents: PropTypes.bool
}

export default SearchButtons
