import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { delExEdu } from '../../actions/profile';

const ProfileExperience = ({
  experience: { company, title, from, to, description },
}) => {
  return (
    <div>
      <h3 className="text-dark in">{company}</h3>
      <p>
        <Moment format="DD/MM/YYYY">{from}</Moment> -{' '}
        {to === null ? ' נוכחי' : <Moment format="DD/MM/YYYY">{to}</Moment>}
      </p>
      <p>
        <strong>תפקיד: </strong>
        {title}
      </p>
      {description && (
        <p>
          <strong>Description: </strong>
          {description}
        </p>
      )}
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
