import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getAllProfiles } from '../../actions/profile';

const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getAllProfiles();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h1 className="large text-primary">מפתחים</h1>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> מצאו מפתחים והתחברו אליהם
          </p>
          <div className="profiles">
            {!loading && profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>לא נמצאו מפתחים</h4>
            )}
          </div>
        </>
      )}
    </>
  );
};

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
