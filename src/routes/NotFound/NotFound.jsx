import React from 'react';
import { connect } from 'react-redux';

export class NotFound extends React.Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <>
        {isLoggedIn && (
          <>
            <p>
            Edit <code>src/routes/NotFound/NotFound.jsx</code> and save to reload.
            </p>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return { isLoggedIn: state.auth.isLoggedIn };
};

export default connect(
  mapStateToProps
)(NotFound);
