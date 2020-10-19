import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInputVal: ''
    };
  }

  updateInput(event) {
    this.setState({
      userInputVal: event.currentTarget.value
    });
  }

  render() {
    return (
      <div>
        <h3>GitHub Username:</h3>
        <input type="text" value={this.state.userInputVal} onChange={this.updateInput} />
        <a href={`/git-auth?user=${this.state.userInputVal}`}>Login</a>
      </div>
    );
  }
}
