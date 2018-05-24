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
        <Button onClick={() => alert('not implemented yet')}>
          <i className='fas fa-cog' />
          Options
        </Button>
      </div>
    )
  }
}

SearchButtons.propTypes = {
  toggleFilters: PropTypes.func.isRequired
}

export default SearchButtons
