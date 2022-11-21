import axios from 'axios';
import React, { Component } from 'react';

class TestAxios extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      errorMsg: ""
    };
  }


  componentDidMount() {
    axios.get('https://jsonplaceholddder.typicode.com/posts')
    .then(response => {
      console.log(response);
      this.setState({posts: response.data});
    })
    .catch(error => {
      console.log(error);
      this.setState({errorMsg: "Error retrieving data"});
    }
    );

  }

  render() {
    const { posts, errorMsg } = this.state;
    return (
      <div>
        <h1>Test Axios</h1>
        {
          posts.length ?
          posts.map(post => <div key={post.id}>{post.title}</div>) :
          null
        }
        {
          errorMsg ? <div>{errorMsg}</div> : null
        }
      </div>
    )
  }
}

export default TestAxios;