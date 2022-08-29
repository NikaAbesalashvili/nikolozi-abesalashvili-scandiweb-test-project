import { Component } from "react";

import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import './Select.css';

export default class Select extends Component {

    constructor() {
        super();
        this.state = {
            dropDownExpanded: false,
        };

        this.handleDropdownExpand = this.handleDropdownExpand.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
    };

    handleDropdownExpand() {
        this.setState({ dropDownExpanded: !this.state.dropDownExpanded });
    };

    closeDropdown(newCurrency) {
        this.props.handleCurrencyChange(newCurrency);
        this.setState({ dropDownExpanded: !this.state.dropDownExpanded });
    };

    render() {
        return (
            <div className="dropdown" >

                <div className='main-area' >
                    <span className='selected-currency' >
                        {this.props.selectedCurrency}
                    </span>
                    <button
                        className='dropdown-button'
                        onClick={this.handleDropdownExpand}
                    >
                        {this.state.dropDownExpanded ? (
                            <FaAngleUp/>
                        ) : (
                            <FaAngleDown/>
                        )}
                    </button>
                </div>

                {this.state.dropDownExpanded && (
                    <div className="container">
                        <div className="currencies">
                            {this.props.currencies.map((currency, index) => (
                                <h2
                                    className="currency-symbol"
                                    key={index}
                                    onClick={() => this.closeDropdown(index)}
                                >
                                    {currency.symbol} {currency.label}
                                </h2>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        );
    };
};
