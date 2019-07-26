import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Headline1 } from '@material/react-typography';
import TextField, { Input } from '@material/react-text-field';
import Button from '@material/react-button';
import { signIn } from '../../redux/actions';
import './Login.scss'

export class Login extends React.Component {
  state = {username: '', password: ''};
  handleUsernameChange = e => {
    this.setState({username: e.currentTarget.value});
  }
  handlePasswordChange = e => {
    this.setState({password: e.currentTarget.value});
  }
  handleSignIn = () => {
    this.props.signIn();
  }
  render() {
    return (
      <>
        <Headline1>Sign in to PlatIAgro</Headline1>

        <TextField outlined label="Username">
          <Input id="username" onChange={this.handleUsernameChange} value={this.state.username} />
        </TextField>

        <TextField outlined label="Password">
          <Input id="password" type="password" onChange={this.handlePasswordChange} value={this.state.password} />
        </TextField>

        <Button raised onClick={this.handleSignIn} className="btn-secondary">Sign in</Button>

        <p>
          <Link to="/password_reset" className="App-link">Forgot password</Link>
        </p>
      </>
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
