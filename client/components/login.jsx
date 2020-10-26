import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInputVal: ''
    };
    this.updateInput = this.updateInput.bind(this);
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
        <a href={`/api/token?user=${this.state.userInputVal}`}>Login</a>
      </div>
    );
  }
}

export default Login;
