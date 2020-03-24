import React, { Component } from 'react';
import { CountryDropdown } from 'react-country-region-selector';


class CountrySelector extends Component {
    constructor (props) {
    super(props);
    this.state = { country: ''};
    }

    selectCountry (val) {
        console.log(val);
        this.setState({ country: val });
        this.props.onCountrySelected(val);
    }

    render () {
    const { country, region } = this.state;
    return (
        <div>
        <CountryDropdown
            value={country}
            valueType="short"
            onChange={(val) => {
                console.log('Country selected')
                this.selectCountry(val)
            }} />
        </div>
    );
    }
}

export default CountrySelector;