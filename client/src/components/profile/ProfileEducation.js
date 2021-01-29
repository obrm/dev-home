import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, from, to, description },
}) => {
  return (
    <div>
      <h3 style={{ fontWeight: '400' }}>
        <strong>מוסד לימודים / קורס: </strong>
        {school}
      </h3>
      <p>
        <Moment format="DD/MM/YYYY">{from}</Moment> -{' '}
        {to === null ? ' נוכחי' : <Moment format="DD/MM/YYYY">{to}</Moment>}
      </p>
      {degree && (
        <p>
          <strong>תואר / תעודה: </strong>
          {degree}
        </p>
      )}
      <p>
        <strong>תחום לימודים: </strong>
        {fieldofstudy}
      </p>
      {description && (
        <p>
          <strong>תיאור: </strong>
          {description}
        </p>
      )}
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
