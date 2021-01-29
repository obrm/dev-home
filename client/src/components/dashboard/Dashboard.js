import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import Alert from '../layout/Alert';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {user ? `בית המפתחים | ${user.name}` : 'בית המפתחים | לוח בקרה'}
        </title>
      </Helmet>
      <section className="container">
        <Alert />
        {loading && profile === null ? (
          <>
            <h1 className="large text-primary">לוח בקרה</h1>
            <Spinner />
          </>
        ) : (
          <>
            <h1 className="large text-primary">לוח בקרה</h1>
            <p className="lead">
              <i className="fas fa-user"></i>{' '}
              {(user && user.gender === 'male' && `ברוך הבא ${user.name}`) ||
                (user &&
                  user.gender === 'female' &&
                  `ברוכה הבאה ${user.name}`) ||
                (user === null && 'ברוכים הבאים')}
            </p>
            {profile !== null ? (
              <>
                <DashboardActions />
                {profile.experience.length > 0 && (
                  <Experience experience={profile.experience} />
                )}
                {profile.education.length > 0 && (
                  <Education education={profile.education} />
                )}
              </>
            ) : (
              <>
                <p>טרם יצרת פרופיל</p>
                <Link to="/create-profile" className="btn btn-primary my-1">
                  יצירת פרופיל
                </Link>
              </>
            )}
            <div className="my-2">
              <button
                className="btn btn-danger"
                onClick={() => deleteAccount()}
              >
                <i className="fas fa-user-minus"></i> מחיקת חשבון
              </button>
            </div>
          </>
        )}
      </section>
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
