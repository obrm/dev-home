import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
  user,
}) => {
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
  const [displaySocialInputs, toggleDisplaySocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    if (!loading && profile) {
      for (const [key, value] of Object.entries(profile)) {
        if (key !== 'skills' && key !== 'social' && value !== '') {
          formData[key] = value;
        } else if (key === 'social' && profile.social) {
          for (const key in profile.social) {
            formData[key] = profile.social[key];
          }
        }
      }
    }

    setFormData({
      ...formData,
      skills: loading || !profile.skills ? '' : profile.skills.join(', '),
    });
    // eslint-disable-next-line
  }, [loading]);

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

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <>
      <Helmet>
        <title>{'בית המפתחים | עריכת פרופיל'}</title>
      </Helmet>
      <section className="container">
        <h1 className="large text-primary">עריכת פרופיל</h1>
        {!profile ? (
          <Spinner />
        ) : (
          <>
            <p className="lead mb-n">
              <i className="fas fa-user" /> הוסיפו את המידע שיגרום לפרופיל שלכם
              לבלוט
            </p>
            <small>* = שדות חובה</small>
            <form
              className="form"
              onSubmit={onSubmit}
              style={{ display: 'inline' }}
            >
              <div className="form-group">
                <select
                  name="status"
                  value={status}
                  onChange={onChange}
                  required
                >
                  <option value="">* בחירת סטטוס מקצועי</option>
                  {(user.gender === 'male' && (
                    <>
                      <option value="מפתח ג'וניור">מפתח ג'וניור</option>
                      <option value="מפתח בכיר">מפתח בכיר</option>
                      <option value="מפתח">מפתח</option>
                      <option value="מנהל">מנהל</option>
                      <option value="סטודנט או לומד תכנות">
                        סטודנט או לומד תכנות
                      </option>
                    </>
                  )) ||
                    (user.gender === 'female' && (
                      <>
                        <option value="מפתחת ג'וניורית">מפתחת ג'וניורית</option>
                        <option value="מפתחת בכירה">מפתחת בכירה</option>
                        <option value="מפתחת">מפתחת</option>
                        <option value="מנהלת">מנהלת</option>
                        <option value="סטודנטית או לומדת תכנות">
                          סטודנטית או לומדת תכנות
                        </option>
                      </>
                    ))}
                  <option value="מורה / מרצה">מורה / מרצה</option>
                  <option value="מתמחה">מתמחה</option>
                  <option value="אחר">אחר</option>
                </select>
                <small className="form-text">
                  היכן אתם מבחינת קריירה עכשיו?
                </small>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="חברה"
                  name="company"
                  value={company}
                  onChange={onChange}
                />
                <small className="form-text">
                  החברה שבה אתם עובדים או החברה שלכם
                </small>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="אתר"
                  name="website"
                  value={website}
                  onChange={onChange}
                />
                <small className="form-text">
                  האתר שלכם או של החברה בה אתם עובדים
                </small>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="מיקום"
                  name="location"
                  value={location}
                  onChange={onChange}
                />
                <small className="form-text">
                  עיר ("תל אביב, ישראל" לדוגמה)
                </small>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="* כישורים"
                  name="skills"
                  value={skills}
                  onChange={onChange}
                  required
                />
                <small className="form-text">
                  נא להשתמש בערכים המופרדים בפסיקים (HTML,CSS,JavaScript,PHP
                  לדוגמה)
                </small>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="שם משתמש בגיטהאב"
                  name="githubusername"
                  value={githubusername}
                  onChange={onChange}
                />
                <small className="form-text">
                  אם אתם מעוניינים בהצגת הריפוז האחרונים שלכם והלינק לגיטהאב
                  שלכם, אנא הוסיפו את שם המשתמש שלכם בגיטהאב
                </small>
              </div>
              <div className="form-group">
                <textarea
                  placeholder="כמה מילים על עצמכם"
                  name="bio"
                  value={bio}
                  onChange={onChange}
                />
                <small className="form-text">ספרו לנו קצת על עצמכם</small>
              </div>
              <div className="mt-2">
                <button
                  onClick={() =>
                    toggleDisplaySocialInputs(!displaySocialInputs)
                  }
                  type="button"
                  className="btn btn-dark"
                >
                  ערכו / הוסיפו קישורים לרשתות החברתיות שלכם
                </button>
                <span>
                  <small>&nbsp;&nbsp; אופציונאלי</small>
                </span>
              </div>
              {displaySocialInputs && (
                <>
                  <div className="form-group social-input">
                    <i className="fab fa-twitter fa-2x" />
                    <input
                      type="text"
                      placeholder="Twitter"
                      name="twitter"
                      value={twitter}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group social-input">
                    <i className="fab fa-facebook fa-2x" />
                    <input
                      type="text"
                      placeholder="Facebook"
                      name="facebook"
                      value={facebook}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group social-input">
                    <i className="fab fa-youtube fa-2x" />
                    <input
                      type="text"
                      placeholder="YouTube"
                      name="youtube"
                      value={youtube}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group social-input">
                    <i className="fab fa-linkedin fa-2x" />
                    <input
                      type="text"
                      placeholder="Linkedin"
                      name="linkedin"
                      value={linkedin}
                      onChange={onChange}
                    />
                  </div>
                  <div className="form-group social-input">
                    <i className="fab fa-instagram fa-2x" />
                    <input
                      type="text"
                      placeholder="Instagram"
                      name="instagram"
                      value={instagram}
                      onChange={onChange}
                    />
                  </div>
                </>
              )}
              <input type="submit" className="btn btn-primary my-1" />
            </form>

            <button
              className="btn btn-light mr"
              onClick={() => history.goBack()}
            >
              חזרה
            </button>
          </>
        )}
      </section>
    </>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
})(withRouter(EditProfile));
