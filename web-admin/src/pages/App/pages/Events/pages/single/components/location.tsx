import React from 'react';
import { Input, Icon } from 'antd';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

class Location extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { address: '', latLng: '' };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = async address => {
    await this.setState({ address });
    await geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({ latLng }))
      .catch(error => console.error('Error', error));
    this.props.getAddress(this.state);
  };
  componentDidMount() {
    if (this.props.id && this.props.address) {
      this.setState({ address: this.props.address });
    }
  }
  render() {
    console.log('stateAdress', this.props);
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input
              prefix={
                <Icon
                  type="environment-o"
                  style={{ color: 'rgba(0,0,0,.25)' }}
                />
              }
              {...getInputProps({
                placeholder: 'Location',
                className: 'location-search-input'
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default Location;
