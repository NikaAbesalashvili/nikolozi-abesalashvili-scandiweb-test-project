import { Component } from 'react';
import { ProductsContext } from '../../context';
import Select from '../Select/Select';
import { BsCart2 } from 'react-icons/bs';

import logo from '../../assets/a-logo.png';
import './Navbar.css';

export default class Navbar extends Component {

    handleCartOpen() {
        console.log('CART OPEN');
    };
    
    render() {

        const {
            categories,
            currencies,
            activeCurrency,
            handleCategoryChange,
            handleCurrencyChange,
        } = this.context;

        return (
            <header>
                <nav>
                    {categories && (
                        <ul className="categories">
                            {categories.map((category, index) => (
                                <li key={index} onClick={() => handleCategoryChange(category.name)} >
                                    {category.name}
                                </li>
                            ))}
                        </ul>
                    )}
                    <img className='logo' src={logo} alt="logo" />
                    <div className='cart-and-currencies' >
                            
                        <Select
                            selectedCurrency={activeCurrency}
                            currencies={currencies}
                            handleCurrencyChange={handleCurrencyChange}
                        />

                        <button
                            className='cart-button'
                            onClick={this.handleCartOpen}
                        >
                                <BsCart2/>
                        </button>

                    </div>
                </nav>
            </header>
        );
    };
};

Navbar.contextType = ProductsContext;
