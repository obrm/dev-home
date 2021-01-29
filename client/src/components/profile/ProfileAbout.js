import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  return (
    <div className="profile-about bg-light p-2">
      {bio && (
        <>
          <h2 className="text-primary">אודות</h2>
          <p>{bio}</p>
          <div className="line"></div>
        </>
      )}
      <h2 className="text-primary">כישורים</h2>
      <div className="skills">
        {skills.map((skill, index) => (
          <div className="p-1" key={index}>
            {skill} <i className="fa fa-check" />
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
