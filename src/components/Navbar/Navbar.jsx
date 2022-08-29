import { Component } from 'react';
import Select from '../Select/Select';
import { BsCart2 } from 'react-icons/bs';

import logo from '../../assets/a-logo.png';
import './Navbar.css';

export default class Navbar extends Component {

    handleCartOpen() {
        console.log('CART OPEN');
    };
    
    render() {
        return (
            <header>
                <nav>
                    <img src={logo} alt="logo" />
                    <div className='cart-and-currencies' >
                        
                        
                        <Select
                            selectedCurrency={this.props.activeCurrency}
                            currencies={this.props.currencies}
                            handleCurrencyChange={this.props.handleCurrencyChange}
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
