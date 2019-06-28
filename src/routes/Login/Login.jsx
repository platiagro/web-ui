import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../redux/actions';

export class Login extends React.Component {
  handleSignIn = () => {
    this.props.signIn();
  }
  render() {
    return (
      <div>
        <p>
        Edit <code>src/routes/Login/Login.jsx</code> and save to reload.
        </p>
        <p>
          <input type="button" value="Sign In" className="App-button" onClick={this.handleSignIn} />
        </p>
      </div>
    );
  }
}

// Normally is an object full of action creators
const mapDispatchToProps = {
  signIn
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
