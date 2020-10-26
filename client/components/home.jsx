import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
    fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${this.props.match.params.token}`
      }
    })
      .then(res => res.json())
      .then(data => this.setState({
        isLoading: false,
        data
      }, console.log));
  }

  render() {
    return (
      <div>
        <h1>Logged In!</h1>
        <h4>Access Token: {this.props.match.params.token}</h4>
        <p>{this.state.isLoading ? 'Loading...' : 'Data retrieved!'}</p>
      </div>
    );
  }
}

export default Home;
