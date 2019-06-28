import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../redux/actions';

export class Home extends React.Component {
  handleSignOut = () => {
    this.props.signOut();
  }
  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        {isLoggedIn && (
          <div>
            <p>
            Edit <code>src/routes/Home/Home.jsx</code> and save to reload.
            </p>
            <p>
              <input type="button" value="Sign out" className="App-button" onClick={this.handleSignOut} />
            </p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isLoggedIn: state.login.isLoggedIn };
};

const mapDispatchToProps = {
  signOut
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
