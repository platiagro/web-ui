import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../redux/actions';

class Home extends React.Component {
  handleSignOut = () => {
    this.props.signOut();
  }
  render() {
    return (
      <div>
        <p>
        Edit <code>src/routes/Home/Home.jsx</code> and save to reload.
        </p>
        <p>
          <input type="button" value="Sign out" className="App-button" onClick={this.handleSignOut} />
        </p>
      </div>
    )
  }
}

const mapDispatchToProps = {
  signOut
};

export default connect(
  null,
  mapDispatchToProps
)(Home);
