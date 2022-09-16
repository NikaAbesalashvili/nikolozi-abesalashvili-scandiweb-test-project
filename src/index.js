import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client'
import { ProductsProvider } from './context';

import { apolloClient } from './graphql';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={apolloClient} >
        <ProductsProvider>
            <App />
        </ProductsProvider>
    </ApolloProvider>
);

