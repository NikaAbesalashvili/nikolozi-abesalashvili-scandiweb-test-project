import { Component } from "react";
import { Link } from "react-router-dom";
import { ProductsConsumer } from '../../../context';

import './FilterParameter.css';

export default class FilterParameter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedValueIndex: null,
            pageUrl: '',
        };

        this.handleAttributeValueSelect = this.handleAttributeValueSelect.bind(this)
    };

    handleAttributeValueSelect(valueIndex, selectCallback) {
        this.setState({ selectedValueIndex: valueIndex !== this.state.selectedValueIndex ? valueIndex : null });
        
        let attributeName = this.props.attributeName.split(' ').join('_');
        let attributeValue = this.props.attributeName === 'Color' ? this.props.attributeValues[valueIndex].displayValue : this.props.attributeValues[valueIndex].value

        selectCallback(attributeName, attributeValue);
    };

    render() {

        const { attributeName, attributeValues } = this.props;

        return (

            <ProductsConsumer>

                {(productsProps) => {

                    const {
                        categories,
                        selectedCategoryIndex,
                        selectedAttributes,
                        handleAttributeSelect,
                    } = productsProps;

                    return (
                        <div className='attribute' >
                            <h3 className='attribute-name' >{attributeName}</h3>
                            <ul className="attribute-values">
                                {attributeValues.map((item, index) => (
                                        <li
                                            className="attribute-value"
                                            key={index}
                                            style={{ backgroundColor: attributeName !== 'Color' ? 'transparent': item.value}}
                                            onClick={() => this.handleAttributeValueSelect(index, handleAttributeSelect)}
                                        >
                                            <Link
                                                className={`attribute-link${(this.state.selectedValueIndex === index && attributeName.split(' ').join('_') in selectedAttributes) ? attributeName !== 'Color' ? ' selected-filter-value' : ' selected-color' : ''}${attributeName !== 'Color' ? '' : ' color-attribute'}`} 
                                                to={{
                                                    pathname: categories[selectedCategoryIndex].name === 'all' ? '/' : `/${categories[selectedCategoryIndex].name}`,
                                                }}
                                            >
                                                {attributeName !== 'Color' && item.displayValue}
                                            </Link>

                                        </li>
                                ))}
                            </ul>
                        </div>
                    );
                }}
            </ProductsConsumer>
        );
    };
};
