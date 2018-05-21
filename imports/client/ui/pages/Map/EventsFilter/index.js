import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Tooltip } from 'reactstrap'
import FiltersList from './FiltersList'
import './styles.scss'

class EventsFilter extends Component {
  state = {
    listOpen: false,
    tooltipOpen: false
  }

  render () {
    const {
      listOpen,
      tooltipOpen
    } = this.state

    return (
      <div id='filter-events'>
        <Button id='filter-button' onClick={this.toggleFiltersList}>
          <i className='fa fa-filter' />
        </Button>
        <Tooltip placement='left' isOpen={tooltipOpen} target='filter-button' toggle={this.toggleTooltip}>
          Filter
        </Tooltip>

        <FiltersList
          show={listOpen}
          onChange={this.applyFilters}
          toggleFiltersList={this.toggleFiltersList}
        />
      </div>
    )
  }

  applyFilters = filters_ => {
    let filters = filters_.map(filter => filter.name) // keep on top so can be reusable

    const events = this.props.events.filter(event => {
      const categories = event.categories.map(category => category.name)

      return categories.some(category => filters.includes(category))
    })

    this.props.onFiltersChanged(events)
  }

  toggleFiltersList = () => { this.setState(prev => ({ listOpen: !prev.listOpen })) }
  toggleTooltip = () => { this.setState(prev => ({ tooltipOpen: !prev.tooltipOpen })) }
}

EventsFilter.propTypes = {
  events: PropTypes.array.isRequired,
  onFiltersChanged: PropTypes.func.isRequired
}

export default EventsFilter
