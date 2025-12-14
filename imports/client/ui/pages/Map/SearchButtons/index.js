import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import './styles.scss'
import i18n from '/imports/both/i18n/en'

class SearchButtons extends Component {
  render () {
    const labels = i18n.Map
    return (
      <div className='buttons'>
        <Button 
          className='my-location-btn'
          onClick={this.props.goToMyLocation}
          title={labels.myLocationBtn}
        >
          <i className='fa fa-location-arrow' />
        </Button>
        <Button onClick={this.props.toggleFilters}>
          <i className='fa fa-filter' />
          {labels.filterBtn}
        </Button>
        <Button
          className={this.props.showNextView ? 'upcoming-btn active' : 'upcoming-btn'}
          onClick={this.props.toggleNextView}
        >
          <i className='fa fa-clock' />
          {this.props.showNextView ? labels.listButton : labels.upcomingButton}
        </Button>
        {this.props.showNextView && (
          <Button
            className='print-btn'
            onClick={this.props.handlePrint}
            title={labels.printCalendarBtn}
          >
            <i className='fa fa-print' />
            {labels.printBtn}
          </Button>
        )}
        <Button
          onClick={this.props.togglePastEvents}
        >
          {this.props.showPastEvents ? labels.hidePastBtn : labels.showPastBtn}
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
  goToMyLocation: PropTypes.func.isRequired,
  toggleFilters: PropTypes.func.isRequired,
  toggleNextView: PropTypes.func.isRequired,
  showNextView: PropTypes.bool,
  handlePrint: PropTypes.func,
  togglePastEvents: PropTypes.func,
  showPastEvents: PropTypes.bool
}

export default SearchButtons
