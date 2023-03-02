import { Component } from "react";
import { ProductsConsumer } from '../../../context';

import './FilterParameter.css';

export default class FilterParameter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedValueIndex: null,
        };

        this.handleAttributeValueSelect = this.handleAttributeValueSelect.bind(this)
    };

    handleAttributeValueSelect(valueIndex, selectCallback) {
        this.setState({ selectedValueIndex: valueIndex !== this.state.selectedValueIndex ? valueIndex : null });
        selectCallback(this.props.attributeName, this.props.attributeValues[valueIndex].value);
    };

    render() {

        const { attributeName, attributeValues } = this.props;

        return (

            <ProductsConsumer>

                {(productsProps) => {

                    const { handleAttributeSelect } = productsProps;

                    return (
                        <div className='attribute' >
                            <h3 className='attribute-name' >{attributeName}</h3>
                            <div className="attribute-values">
                                {attributeValues.map((item, index) => (
                                        <span
                                            className={`attribute-value${this.state.selectedValueIndex === index ? attributeName !== 'Color' ? ' selected-filter-value' : ' selected-color' : ''} ${attributeName !== 'Color' ? '' : 'color-attribute'}`}
                                            key={index}
                                            style={{ backgroundColor: attributeName !== 'Color' ? 'transparent': item.value}}
                                            onClick={() => this.handleAttributeValueSelect(index, handleAttributeSelect)}
                                        >
                                            {attributeName !== 'Color' && item.displayValue}
                                        </span>
                                ))}
                            </div>
                        </div>
                    );
                }}
            </ProductsConsumer>
        );
    };
};
