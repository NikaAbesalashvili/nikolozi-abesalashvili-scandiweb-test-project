import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { Products } from './pages';
import { Navbar } from './components';

const GET_CURRENCIES = gql`
	query currencies {
		currencies {
			label
			symbol
		}
	}
`;

const GET_PRODUCTS = gql`
	query categories {
		category {
			name
			products {
				id
				name
				isStock
				gallery
				prices {
					amount
					currency {
						label
						symbol
					}
				}
			}
		}
	}
`

const currencies = [
	{
	  "label": "USD",
	  "symbol": "$"
	},
	{
	  "label": "GBP",
	  "symbol": "£"
	},
	{
	  "label": "AUD",
	  "symbol": "A$"
	},
	{
	  "label": "JPY",
	  "symbol": "¥"
	},
	{
	  "label": "RUB",
	  "symbol": "₽"
	}
  ]

const cateogries = [
	{
	  "name": "all"
	},
	{
	  "name": "clothes"
	},
	{
	  "name": "tech"
	}
  ]

export default class App extends Component {

	constructor() {
		super();
		this.state = {
			products: [],
			currencySymbol: '',
			activeCurrency: 0,
			selectedCategory: 'all'
		}

		this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
	};

	handleCurrencyChange(newCurrency) {
		this.setState({ activeCurrency: newCurrency });
	};

	handleCategoryChange(newCategory) {
		this.setState({ selectedCategory: newCategory });
	};

	componentDidMount() {

		const client = new ApolloClient({
			uri: 'http://localhost:4000/',
			cache: new InMemoryCache(),
		});

		client
			.query({
				query: gql`
					query categories {
						category {
							name
							products {
								id
								name
								inStock
								gallery
								description
								category
								prices {
									currency {
										label
										symbol
									}
									amount
								}
								brand
							}
						}
					}
				`
			})
			.then((result) => {
				console.log(result);
				this.setState({
					categoryName: result?.data.category.name,
					products: result?.data.category.products,
				});
			});
	};

	render() {
		return (
			<>
				<BrowserRouter>
					<Navbar
						activeCurrency={currencies[this.state.activeCurrency].symbol}
						currencies={currencies}
						handleCurrencyChange={this.handleCurrencyChange}
						handleCategoryChange={this.handleCategoryChange}
						categories={cateogries}
					/>
					<Routes>
						<Route 
							path='/'
							element={
								<Products
									products={this.state.products}
									categoryName={this.state.selectedCategory}
									activeCurrency={this.state.activeCurrency}
								/>
							}
						/>
					</Routes>
				</BrowserRouter>
			</>
		);
	};
};
