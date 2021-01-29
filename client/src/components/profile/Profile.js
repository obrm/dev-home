import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../actions/profile';

const Profile = ({
  getProfileById,
  match,
  profile: { profile, loading },
  auth,
  history,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {!loading && profile !== null
            ? `בית המפתחים | ${profile.user.name}`
            : 'בית המפתחים | דף פרופיל'}
        </title>
      </Helmet>
      <section className="container">
        {profile === null || loading ? (
          <Spinner />
        ) : (
          <>
            <div className="profile-grid my-1">
              <ProfileTop profile={profile} />
              <ProfileAbout profile={profile} />
              <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">ניסיון תעסוקתי</h2>
                {profile.experience.length > 0 ? (
                  profile.experience.map(exp => (
                    <ProfileExperience key={exp._id} experience={exp} />
                  ))
                ) : (
                  <h4 className="mr">לא צויין</h4>
                )}
              </div>
              <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">השכלה</h2>
                {profile.education.length > 0 ? (
                  profile.education.map(edu => (
                    <ProfileEducation key={edu._id} education={edu} />
                  ))
                ) : (
                  <h4 className="mr">לא צויין</h4>
                )}
              </div>
              {profile.githubusername && (
                <ProfileGithub username={profile.githubusername} />
              )}
            </div>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <Link to="/edit-profile" className="btn btn-dark">
                  עריכת פרופיל
                </Link>
              )}
            <button
              onClick={() => history.goBack()}
              className="btn btn-light mr"
            >
              חזרה
            </button>
          </>
        )}
      </section>
    </>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
