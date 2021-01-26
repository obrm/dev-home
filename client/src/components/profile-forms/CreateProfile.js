import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CreateProfile = props => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  return (
    <>
      <Helmet>
        <title>{'בית המפתחים - יצירת פרופיל'}</title>
      </Helmet>
      <h1 className="large text-primary">יצירת פרופיל</h1>
      <p className="lead mb-n">
        <i className="fas fa-user" /> הוסיפו את המידע שיגרום לפרופיל שלכם לבלוט
      </p>
      <small>* = שדות חובה</small>
      <form className="form">
        <div className="form-group">
          <select name="status">
            <option value={0}>* בחירת סטטוס מקצועי</option>
            <option value="Junior Developer">מפתח ג'וניור</option>
            <option value="Senior Developer">מפתח בכיר</option>
            <option value="Developer">מפתח</option>
            <option value="Manager">מנהל</option>
            <option value="Student or Learning">סטודנט או לומד תכנות</option>
            <option value="Instructor">מורה או מרצה</option>
            <option value="Intern">מתמחה</option>
            <option value="Other">אחר</option>
          </select>
          <small className="form-text">היכן אתם מבחינת קריירה עכשיו?</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="חברה" name="company" />
          <small className="form-text">
            החברה שבה אתם עובדים או החברה שלכם
          </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="אתר" name="website" />
          <small className="form-text">
            האתר שלכם או של החברה בה אתם עובדים
          </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="מיקום" name="location" />
          <small className="form-text">עיר ("תל אביב, ישראל" לדוגמה)</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="* כישורים" name="skills" />
          <small className="form-text">
            נא להשתמש בערכים המופרדים בפסיקים (HTML,CSS,JavaScript,PHP לדוגמה)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="שם משתמש בגיטהאב"
            name="githubusername"
          />
          <small className="form-text">
            אם אתם מעוניינים בהצגת הריפוז האחרונים שלכם והלינק לגיטהאב שלכם, אנא
            הוסיפו את שם המשתמש שלכם בגיטהאב
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="כמה מילים על עצמכם"
            name="bio"
            defaultValue={''}
          />
          <small className="form-text">ספרו לנו קצת על עצמכם</small>
        </div>
        <div className="mt-2 mb-n1">
          <p className="lead" style={{ display: 'inline-block' }}>
            הוסיפו קישורים לרשתות החברתיות שלכם
          </p>
          <small>&nbsp;&nbsp; אופציונאלי</small>
        </div>
        <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x" />
          <input type="text" placeholder="Twitter" name="twitter" />
        </div>
        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x" />
          <input type="text" placeholder="Facebook" name="facebook" />
        </div>
        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x" />
          <input type="text" placeholder="YouTube" name="youtube" />
        </div>
        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x" />
          <input type="text" placeholder="Linkedin" name="linkedin" />
        </div>
        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x" />
          <input type="text" placeholder="Instagram" name="instagram" />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light mr" href="dashboard.html">
          חזרה
        </a>
      </form>
    </>
  );
};

CreateProfile.propTypes = {};

export default connect()(CreateProfile);
