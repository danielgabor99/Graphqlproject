import React from 'react';
import ApolloClient from 'apollo-boost';
import logo from './logo.svg';
import Posts from './Posts'
import './App.css';
import {ApolloProvider} from 'react-apollo'


const client= new ApolloClient({
  uri:"https://fakerql.stephix.uk/graphql"
})

const App = () => (
  <ApolloProvider client={client}>
    <div>
     <Posts />
    </div>

  </ApolloProvider>
)


export default App;
