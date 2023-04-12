import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem, CustomInput } from 'reactstrap'
// import categoryTree from '/imports/both/i18n/en/categories.json'

import './styles.scss'
import i18n from '/imports/both/i18n/en'

let categoryTree = i18n.Categories

// categoryTree includes parent-child level categories, following operation build an all-child array of sub-categories
// the last function elem.categories.map(...) adds an additional 'hidden' field to each subscategory for UI purposes
let possibleCategories = categoryTree.reduce((tot, elem) => {
  return tot.concat([{ name: elem.name, parent: true }].concat(elem.categories.map(category => {
    category.hidden = true
    return category
  })))
}, [])

// We need the list of parent categories in order to disable them in the category dropdown
// (because these are subheadings in the dropdown -> user selects the actual child category instead)
const parentCategories = categoryTree.map(elem => elem.name)

class FiltersList extends Component {
  state = {
    checkAll: false,
    checkedFilters: possibleCategories.map(elem => {
      elem.checked = false // all unchecked by default
      return elem
    })
    // checkedFilters: Array(possibleCategories.length).fill(true) // all checked by default
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
            <div><span>{i18n.Map.filtersTitle}</span></div>
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
                <ListGroupItem
                  key={index}
                  className="checkbox"
                  style={{
                    marginLeft: category.parent !== true ? '20px' : '0px',
                    color: category.color,
                    display: category.hidden === true ? 'none' : 'block'
                  }}
                >
                  <CustomInput
                    id={'filter-' + index}
                    type='checkbox'
                    label={category.name}
                    checked={checkedFilters[index].checked}
                    onChange={this.handleFilterChange}
                    onClick={category.parent === true ? this.expandCategory : null}
                  />
                  { category.url &&
                    <a href={category.url} target='_blank' rel="external noreferrer" aria-label='Go to Page'>
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

  expandCategory = ({ target }) => {
    const checkedFilters = [...this.state.checkedFilters]
    let index = target.id.split('-')[1]
    if (checkedFilters[index].parent) {
      const parentChecked = checkedFilters[index].checked
      do {
        index++
        // parent currently CHECKED: means you are UNCHECKING, means children should become hidden (so set to true)
        // parent currently UNCHECKED: means you are CHECKING, so children should unhide (so set to false)
        possibleCategories[index].hidden = !!parentChecked
      }
      while (checkedFilters[index + 1] && !checkedFilters[index + 1].parent)
    }
  }

  handleFilterChange = ({ target }) => {
    let checkedFilters = [...this.state.checkedFilters]
    let index = target.id.split('-')[1]
    // console.log(checkedFilters)
    if (checkedFilters[index].checked) {
      checkedFilters[index].checked = false
    } else {
      checkedFilters[index].checked = true
    }

    // if parent, then the tick needs to be propagating to all its child categories
    if (checkedFilters[index].parent) {
      checkedFilters = this.propagateChecksToChildren(checkedFilters, index)
    }

    // if child, then need to check whether all siblings are unticked
    // if all siblings unticked -> untick parent (by setting checkedFilters array)
    //                             and hide children (by setting possibleCategories array)
    if (!checkedFilters[index].parent) {
      const modifiedCategories = this.propagateChecksToParent(checkedFilters, possibleCategories, index)
      checkedFilters = modifiedCategories.checkedFilters
      possibleCategories = modifiedCategories.possibleCategories
    }

    this.setState({ checkedFilters })

    // applyFilter function is designed to work on a simple array with true/false values
    // so we map back our array of objects (checkedFilters) into an array of true/false values
    this.props.onFilter(this.applyFilter(checkedFilters.map(e => e.checked)))
  }

  propagateChecksToChildren = (checkedFilters, index) => {
    // if the checkbox selected belongs to a parent category we apply the change to all its children:
    const parentChecked = checkedFilters[index].checked
    let tempIndex = index
    do {
      tempIndex++
      checkedFilters[tempIndex].checked = parentChecked
    } while (checkedFilters[tempIndex + 1] && !checkedFilters[tempIndex + 1].parent)
    return checkedFilters
  }

  propagateChecksToParent = (checkedFilters, possibleCategories, index) => {
    // if the checkbox is a child category, and all siblings are unchecked, uncheck the parent
    let tempIndex = index
    // traverse array back to the parent
    while (!checkedFilters[tempIndex].parent) tempIndex--
    // save parent index, then move through all the children of this group and verify all are unchecked
    const parentIndex = tempIndex
    let allUnchecked = true
    do {
      tempIndex++
      if (checkedFilters[tempIndex].checked) allUnchecked = false
    } while (checkedFilters[tempIndex + 1] && !checkedFilters[tempIndex + 1].parent)
    // if all are unchecked, set parent to unchecked and hide all the children
    if (allUnchecked) {
      checkedFilters[parentIndex].checked = false
      let tempIndex = parentIndex
      do {
        tempIndex++
        possibleCategories[tempIndex].hidden = true
      } while (checkedFilters[tempIndex + 1] && !checkedFilters[tempIndex + 1].parent)
    }
    return { checkedFilters, possibleCategories }
  }

  toggleAllFilters = () => {
    const checkAll = !this.state.checkAll
    const checkedFilters = possibleCategories.map(elem => {
      elem.checked = checkAll // all checked by default
      return elem
    })

    this.setState({ checkedFilters, checkAll })
    // same as above - we turn the array of objects into simple array of true/false values
    this.props.onFilter(this.applyFilter((checkedFilters.map(e => e.checked))))
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
