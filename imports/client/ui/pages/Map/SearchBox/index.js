import React from 'react'
import PropTypes from 'prop-types'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { ListGroup, ListGroupItem, Input } from 'reactstrap'

class SearchBox extends React.Component {

  state = {
    address: ''
  }

  componentDidMount () {
    const { address } = this.props

    if (address) {
      this.setState({ address})
    }
  }

  render () {
    const { address } = this.state
    const {
      placeholder
    } = this.props

    return (
      <PlacesAutocomplete
        value={address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div id='google-maps-searchbox'>
            <div className='input-icon'>
              <Input
                ref={ref => this.searchInput = ref}
                {...getInputProps({
                  placeholder,
                  className: 'location-search-input'
                })}
              />
              <i className='fas fa-search' />
            </div>
            <ListGroup id='suggestions'>
              {suggestions.map((suggestion, i) => (
                <SuggestionItem
                  key={i}
                  item={suggestion}
                  {...getSuggestionItemProps(suggestion)}
                />
              ))}
            </ListGroup>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }

  handleChange = (address) => {
    this.setState({ address })
  }

  handleSelect = (address) => {
    const { onSelect } = this.props

    if (!onSelect) {
      return
    }

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => onSelect({ ...latLng, name: address }))
      .catch(error => console.error('Error', error))
  }
}

const SuggestionItem = ({ item, onClick, ...props }) => (
  <ListGroupItem className={item.active ? 'active' : ''} onClick={onClick} {...props}>
    {item.description}
  </ListGroupItem>
)

SearchBox.defaultProps = {
  placeholder: 'Search'
}

SearchBox.propTypes = {
  onSelect: PropTypes.func.isRequired,
  address: PropTypes.string,
  placeholder: PropTypes.string
}

export default SearchBox
