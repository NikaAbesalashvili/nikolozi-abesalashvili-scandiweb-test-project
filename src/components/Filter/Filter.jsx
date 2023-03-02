import { Component } from "react";
import FilterParameter from './FilterParameter/FilterParameter';

import './Filter.css';

export default class Filter extends Component {

    constructor(props) {
        super(props);

    };

    render() {

        const { attributes } = this.props.attributes;

        return (
            <div className='filter' >
                <h2 className="filter-title" >FIlter</h2>
                {attributes.map((attribute, index) => (
                    <FilterParameter
                        key={index}
                        attributeName={attribute.name}
                        attributeValues={attribute.items}
                    />
                ))}
            </div>
        );
    };
};
