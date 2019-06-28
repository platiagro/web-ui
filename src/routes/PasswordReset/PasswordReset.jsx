import React from 'react';
import { connect } from 'react-redux';
import { Headline1 } from '@material/react-typography';
import TextField, { Input } from '@material/react-text-field';
import Button from '@material/react-button';
import { sendResetEmail } from '../../redux/actions';
import './PasswordReset.scss';

export class PasswordReset extends React.Component {
  state = {email: ''};
  handleEmailChange = e => {
    this.setState({email: e.currentTarget.value});
  }
  handleSendResetEmail = () => {
    this.props.sendResetEmail();
  }
  render() {
    return (
      <>
        <Headline1>Reset yout password</Headline1>

        <TextField outlined label="Email address">
          <Input id="email" onChange={this.handleEmailChange} value={this.state.email} />
        </TextField>

        <Button raised onClick={this.handleSendResetEmail} className="btn-secondary">Send password reset email</Button>
      </>
    );
  }
};

// Normally is an object full of action creators
const mapDispatchToProps = {
  sendResetEmail
};

export default connect(
  null,
  mapDispatchToProps
)(PasswordReset);
