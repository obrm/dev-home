import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpEd } from '../../actions/profile';

const AddEducation = ({ addExpEd, history, auth: { user } }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(true);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <>
      <Helmet>
        <title>{'בית המפתחים | הוספת השכלה'}</title>
      </Helmet>
      <section className="container">
        <h1 className="large text-primary">הוספת השכלה</h1>
        <p className="lead">
          <i className="fas fa-code-branch" /> הוסיפו כל תואר, תעודה או קורס
          שעשיתם
        </p>
        <small>* = שדה חובה</small>
        <form
          className="form"
          onSubmit={e => {
            e.preventDefault();
            addExpEd('education', formData, history, 'השכלה נוספה בהצלחה');
          }}
        >
          <div className="form-group">
            <input
              type="text"
              placeholder="* מוסד לימודים / קורס"
              name="school"
              value={school}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="תואר / תעודה"
              value={degree}
              onChange={onChange}
              name="degree"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* תחום לימודים"
              name="fieldofstudy"
              value={fieldofstudy}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <h4>* מתאריך</h4>
            <input
              type="date"
              name="from"
              value={from}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <p>
              <input
                type="checkbox"
                name="current"
                checked={current}
                value={current}
                onChange={e => {
                  setFormData({ ...formData, current: !current });
                  toggleDisabled(!toDateDisabled);
                }}
              />{' '}
              {(user && user.gender === 'male' && 'לומד שם כעת') ||
                (user && user.gender === 'female' && 'לומדת שם כעת') ||
                (user && user.gender === 'other' && 'לומדים שם כעת') ||
                (user === null && 'לומדים שם כעת')}
            </p>
          </div>
          {toDateDisabled && (
            <div className="form-group">
              <h4>עד תאריך</h4>
              <input type="date" name="to" value={to} onChange={onChange} />
            </div>
          )}
          <div className="form-group">
            <textarea
              name="description"
              cols={30}
              rows={5}
              placeholder="תיאור"
              value={description}
              onChange={onChange}
            />
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light mr" to="/dashboard">
            חזרה
          </Link>
        </form>
      </section>
    </>
  );
};

AddEducation.propTypes = {
  addExpEd: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addExpEd })(withRouter(AddEducation));
