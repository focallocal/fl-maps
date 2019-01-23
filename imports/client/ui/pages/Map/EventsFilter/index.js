import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem, CustomInput } from 'reactstrap'
import possibleCategories from '/imports/both/i18n/en/categories.json'
import i18n from '/imports/both/i18n/en'
import './styles.scss'

class FiltersList extends Component {
  state = {
    checkAll: true,
    checkedFilters: Array(possibleCategories.length).fill(true) // all checked by default
  }

  render () {
    const {
      checkAll,
      checkedFilters
    } = this.state

    const {
      show,
      toggleFiltersList
    } = this.props

    return (
      <div id='filters-list' className={show ? 'show' : ''}>
        <ListGroup>
          <ListGroupItem className='title'>
            <div>{i18n.Map.filtersTitle}</div>
            <i className='fa fa-times close' onClick={toggleFiltersList}/>
            <CustomInput
              id='toggle-all'
              type='checkbox'
              checked={checkAll}
              onChange={this.toggleAllFilters}
            />
          </ListGroupItem>
          <div className='categories-items'>
            {possibleCategories.map((category, index) => {
              return (
                <ListGroupItem key={index} style={{ color: category.color }}>
                  <CustomInput
                    id={'filter-' + index}
                    type='checkbox'
                    label={category.name}
                    checked={checkedFilters[index]}
                    onChange={this.handleFilterChange}
                  />
                  { category.url && 
                    <a href={category.url} target='_blank' rel='external' aria-label='Go to Page'>
                      <i className="far fa-question-circle"></i>
                    </a>
                  }
                </ListGroupItem>
              )
            })}
          </div>
        </ListGroup>
      </div>
    )
  }

  handleFilterChange = ({ target }) => {
    const checkedFilters = [...this.state.checkedFilters]
    const index = target.id.split('-')[1]

    if (checkedFilters[index]) {
      checkedFilters[index] = false
    } else {
      checkedFilters[index] = true
    }
    this.setState({ checkedFilters })
    this.props.onFilter(this.applyFilter(checkedFilters))
  }

  toggleAllFilters = () => {
    const checkAll = !this.state.checkAll
    const checkedFilters = Array(possibleCategories.length).fill(checkAll)

    this.setState({ checkedFilters, checkAll })
    this.props.onFilter(this.applyFilter(checkedFilters))
  }

  applyFilter = (checkedFilters) => {
    const filters = this.mapIndexToCategory(checkedFilters)

    return this.props.events.filter(event => {
      return event.categories.some(category => filters.includes(category.name))
    })
  }

  mapIndexToCategory (indexes) {
    /*
      the "checkedFilters" array contains true/false values to determine
      which filters are checked.
      This function map those indexes to their corresponding categories names
    */

    return possibleCategories.map((category, i) => indexes[i] ? category.name : null)
  }
}

FiltersList.propTypes = {
  show: PropTypes.bool.isRequired,
  events: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired,
  toggleFiltersList: PropTypes.func.isRequired
}

export default FiltersList
