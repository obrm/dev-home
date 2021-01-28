import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpEd } from '../../actions/profile';

const AddExperience = ({ addExpEd, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(true);

  const { company, title, location, from, to, current, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <>
      <Helmet>
        <title>{'בית המפתחים - הוספת ניסיון'}</title>
      </Helmet>
      <h1 className="large text-primary">הוספת ניסיון תעסוקתי</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> הוסיפו כל תפקיד כמפתחים או מתכנתים
        שהיה לכם בעבר
      </p>
      <small>* = שדה חובה</small>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          addExpEd(
            'experience',
            formData,
            history,
            'ניסיון תעסוקתי נוסף בהצלחה'
          );
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* הגדרת תפקיד"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* חברה"
            value={company}
            onChange={onChange}
            name="company"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="מיקום"
            name="location"
            value={location}
            onChange={onChange}
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
            עבודה נוכחית
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
            placeholder="תיאור התפקיד"
            value={description}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light mr" to="/dashboard">
          חזרה
        </Link>
      </form>
    </>
  );
};

AddExperience.propTypes = {
  addExpEd: PropTypes.func.isRequired,
};

export default connect(null, { addExpEd })(withRouter(AddExperience));
