import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
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
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">לוח בקרה</h1>
          <p className="lead">
            <i className="fas fa-user"></i>{' '}
            {(user && user.gender === 'male' && `ברוך הבא ${user.name}`) ||
              (user && user.gender === 'female' && `ברוכה הבאה ${user.name}`) ||
              (user &&
                user.gender === 'other' &&
                `${user.name}, ברוכים הבאים`) ||
              (user === null && 'ברוכים הבאים')}
          </p>
          {profile !== null ? (
            <>has</>
          ) : (
            <>
              <p>טרם יצרת פרופיל</p>
              <Link to="/create-profile" className="btn btn-primary my-1">
                יצירת פרופיל
              </Link>
            </>
          )}
        </>
      )}
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
