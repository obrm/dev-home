import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import Alert from '../layout/Alert';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <Helmet>
        <title>{'בית המפתחים | כניסה'}</title>
      </Helmet>
      <section className="container">
        <Alert />
        <div className="form-container">
          <h1 className="large text-primary">כניסה</h1>
          <p className="lead">
            <i className="fas fa-user" /> כניסה לחשבון
          </p>
          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="דואר אלקטרוני"
                value={email}
                onChange={onChange}
                name="email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="סיסמה"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
            </div>
            <input type="submit" className="btn btn-primary" value="כניסה" />
          </form>
          <p className="my-1">
            עדיין לא נרשמתם? <Link to="/register">הירשמו</Link>
          </p>
        </div>
      </section>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
