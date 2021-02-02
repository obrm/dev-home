import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import Alert from '../layout/Alert';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [gender, setGender] = useState('');

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
    } else {
      setAlert('נא להכניס כתובת דוא"ל תקנית', 'danger');
      return;
    }

    if (gender === '') {
      setAlert('חובה לבחור מגדר', 'danger');
      return;
    }

    if (password !== password2) {
      setAlert('הסיסמאות אינן תואמות', 'danger');
    } else if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
        password
      )
    ) {
      register({ name, email, password, gender });
    } else {
      setAlert(
        'נא להזין סיסמה עם 6 או יותר תווים, לפחות אות קטנה אחת, אות גדולה אחת, מספר אחד ותו מיוחד.',
        'danger',
        5
      );
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <Helmet>
        <title>{'בית המפתחים | הרשמה'}</title>
      </Helmet>
      <section className="container">
        <Alert />
        <div className="form-container">
          <h1 className="large text-primary">הרשמה</h1>
          <p className="lead">
            <i className="fas fa-user" /> יצירת חשבון
          </p>
          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="שם (בעברית)"
                name="name"
                value={name}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="דואר אלקטרוני"
                value={email}
                onChange={onChange}
                name="email"
                required
              />
              <small className="form-text">
                אתר זה משתמש ב-
                <b>
                  <a
                    href="https://he.gravatar.com/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Gravatar
                  </a>{' '}
                </b>
                לתמונות פרופיל, אז כדי לאפשר תמונת פרופיל, יש להשתמש בדוא"ל של{' '}
                <b>
                  <a
                    href="https://he.gravatar.com/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Gravatar
                  </a>
                </b>
              </small>
            </div>
            <div className="form-group">
              <span>
                <h4>מגדר</h4>
              </span>
              <p>
                <span>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value={'male'}
                      onClick={() => setGender('male')}
                    />
                  </label>
                  <span> זכר &nbsp;&nbsp;&nbsp;</span>
                </span>
                <span>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value={'female'}
                      onClick={() => setGender('female')}
                    />
                  </label>
                  <span> נקבה &nbsp;&nbsp;&nbsp;</span>
                </span>
              </p>
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
              <small className="form-text tiny">
                על הסיסמה להכיל 6 או יותר תווים, לפחות אות קטנה אחת, אות גדולה
                אחת, מספר אחד ותו מיוחד אחד
              </small>
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="אישור סיסמה"
                name="password2"
                value={password2}
                onChange={onChange}
                required
              />
            </div>
            <input type="submit" className="btn btn-primary" value="הרשמה" />
          </form>
          <p className="my-1">
            רשומים לאתר? <Link to="/login">היכנסו</Link>
          </p>
        </div>
      </section>
    </>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
