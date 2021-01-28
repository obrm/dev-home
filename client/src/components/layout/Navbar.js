import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">מפתחים</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <span className="hide-sm">לוח בקרה</span>{' '}
          <i className="fas fa-user"></i>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to="/">
          <span className="hide-sm">יציאה</span>{' '}
          <i className="fas fa-sign-out-alt"></i>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">מפתחים</Link>
      </li>
      <li>
        <Link to="/login">כניסה</Link>
      </li>
      <li>
        <Link to="/register">הרשמה</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" /> בית המפתחים
        </Link>
      </h1>
      {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
    </nav>
  );
};

Navigator.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
