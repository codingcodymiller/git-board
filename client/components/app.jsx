import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true
    };
  }

  render() {
    return (
      <div>
        <a href="/git-auth?user=codingcodymiller">Login</a>
      </div>
    );
  }
}
