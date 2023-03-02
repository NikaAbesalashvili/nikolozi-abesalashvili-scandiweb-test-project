import { Component } from "react";

import './FilterParameter.css';

export default class FilterParameter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedValueIndex: null,
        };

        this.handleAttributeValueSelect = this.handleAttributeValueSelect.bind(this)
    };

    handleAttributeValueSelect(valueIndex) {
        this.setState({ selectedValueIndex: valueIndex !== this.state.selectedValueIndex ? valueIndex : null });
    };

    render() {

        const { attributeName, attributeValues } = this.props;

        return (
            <div className='attribute' >
                <h3 className='attribute-name' >{attributeName}</h3>
                <div className="attribute-values">
                    {attributeValues.map((item, index) => (
                            <span
                                className={`attribute-value${this.state.selectedValueIndex === index ? attributeName !== 'Color' ? ' selected-filter-value' : ' selected-color' : ''} ${attributeName !== 'Color' ? '' : 'color-attribute'}`}
                                key={index}
                                style={{ backgroundColor: attributeName !== 'Color' ? 'transparent': item.value}}
                                onClick={() => this.handleAttributeValueSelect(index)}
                            >
                                {attributeName !== 'Color' && item.displayValue}
                            </span>
                    ))}
                </div>
            </div>
        );
    };
};
