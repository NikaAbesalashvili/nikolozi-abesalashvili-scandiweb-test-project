import { Component } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { ProductCard } from './components';

import './App.css';

export default class App extends Component {

	constructor() {
		super();
		this.state = {
			categoryName: '',
			products: [],
		}
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
					products: result?.data.category.products
				})
			});
	};

	render() {
		return (
			this.state.products.length > 1 && (

				<section className='products-section' >
					<h1 className='category-name' >{this.state.categoryName}</h1>
					<div className='products-box'>

						{this.state.products.map((product) => (
							<ProductCard
								productName={product.name}
								productImage={product.gallery[0]}
								currencySymbol={product.prices[0].currency.symbol}
								price={product.prices[0].amount}
								key={product.id}
							/>
						))}

					</div>
				</section>

			)
		);
	};
};
