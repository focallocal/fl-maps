import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem, CustomInput } from 'reactstrap'
import categories from '/imports/both/collections/events/helpers/possibleCategories.json'
import i18n from '/imports/both/i18n/en'

class FiltersList extends Component {
  state = {
    checkAll: true,
    checkedFilters: Array(categories.length).fill(true) // all checked by default
  }

  render () {
    const {
      checkAll,
      checkedFilters
    } = this.state

    const {
      show
    } = this.props

    return (
      <div id='filters-list' style={{ display: !show ? 'none' : '' }}>
        <ListGroup>
          <ListGroupItem className='title'>
            <div>{i18n.Map.filtersTitle}</div>
            <i className='fa fa-times close' onClick={this.props.toggleFiltersList}/>
            <CustomInput
              id='toggle-all'
              type='checkbox'
              checked={checkAll}
              onChange={this.toggleAllFilters}
            />
          </ListGroupItem>
          {categories.map((category, index) => {
            return (
              <ListGroupItem key={index} style={{ color: category.color }}>
                <CustomInput
                  id={'filter-' + index}
                  type='checkbox'
                  label={category.name}
                  checked={checkedFilters[index]}
                  onChange={this.handleFilterChange}
                />
              </ListGroupItem>
            )
          })}
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
    this.props.onChange(this.mapIndexToCategory(checkedFilters))
  }

  toggleAllFilters = () => {
    const checkAll = !this.state.checkAll
    const checkedFilters = Array(categories.length).fill(checkAll)

    this.setState({ checkedFilters, checkAll })
    this.props.onChange(this.mapIndexToCategory(checkedFilters))
  }

  mapIndexToCategory (indexes) {
    /*
      the "checkedFilters" array contains true/false values to determine
      which filters are checked.
      This function map those indexes back to the original value (objects with name & color keys)
    */

    return categories.filter((category, i) => indexes[i])
  }
}

FiltersList.propTypes = {
  show: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
}

export default FiltersList
