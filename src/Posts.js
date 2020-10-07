import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import ApolloClient from 'apollo-boost';
import React, {Fragment} from 'react'
import Histogram from './Histogram'

export const GET_POSTS = gql`{
  allPosts(count: 100000) {
	  id,
    createdAt
	}
}`

const client = new ApolloClient({
  uri: 'https://fakerql.stephix.uk/graphql',
});
const months = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12
}
class Posts extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
      }
    }
    componentDidMount() {
      let postsByMonth = {}
      client
        .query({
          query: GET_POSTS,
        })
        .then(response => {
          let posts = response.data.allPosts
          posts.forEach(post => {
            let month = post.createdAt.split(' ')[1]
            let year = post.createdAt.split(' ')[3]
            if(year === '2019') {
              if(!postsByMonth[month]) {
                postsByMonth[month] = [post]
              } else {
                postsByMonth[month].push(post)
              }
            }
          })
          let postsByMonthSorted = Object.keys(postsByMonth).map(month => ({month, posts: postsByMonth[month]})).sort((a,b) => months[a.month]-months[b.month])
          this.setState({postsByMonthSorted})
        });
    }
    render() {
      if(this.state.postsByMonthSorted) {
        return (
          <Fragment>
            <div style={{width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
              <h1>React GraphQL D3. Number of Posts per month</h1>
              <Histogram
                data={this.state.postsByMonthSorted}
                width={1000}
                height={600}
              />
            </div>
          </Fragment>
        );
      }
      return (
        <div style={{width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{fontSize: '40px', fontWeight: 'bold'}}>Loading</div>
        </div>
      )
    }
  }
  
  export default Posts